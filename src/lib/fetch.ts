import { id } from './faker'
import objToQuery from './objToQuery'

const customFetchCache = new Map()

const getReqId = (): string => {
  const reqId = id()
  if (customFetch.abortControllers[reqId]) {
    return getReqId()
  }
  customFetch.abortControllers[reqId] = new AbortController()
  customFetch.currentRequestId = reqId
  return reqId
}

export type Options = RequestInit & {
  url?: string
  customCache?: boolean
  log?: boolean
  params?: Record<string, any>
  handlers?: {
    onSuccess: (data: any) => void
    onError: (error: any) => void
    onAbort: () => void
  }
}

export type FetchResponse<T> = Promise<{
  data: T | null
  error: any
  info: {
    headers: HeadersInit
    status: number
    statusText: string
    url: string
  } | null
} | void>

export type Fetch = {
  <T>(options: Options): FetchResponse<T>
  baseUrl: string
  accessToken: string
  abortControllers: Record<string, AbortController>
  currentRequestId: string
  cancel: (reqId?: string) => void
  get: <T>(
    url: string | Options,
    options?: Omit<Options, 'url'>
  ) => FetchResponse<T>
  post: <T>(
    url: string | BodyInit,
    body?: BodyInit | Omit<Options, 'url'>,
    options?: Omit<Options, 'url'>
  ) => FetchResponse<T>
  update: <T>(
    url: string | BodyInit,
    body?: BodyInit | Omit<Options, 'url'>,
    options?: Omit<Options, 'url'>
  ) => FetchResponse<T>
  remove: <T>(
    url: string | Options,
    options?: Omit<Options, 'url'>
  ) => FetchResponse<T>
}

const customFetch: Fetch = async <T>(options: Options): FetchResponse<T> => {
  let url = ''

  if (typeof options === 'string') {
    url = options
  } else {
    if (options?.url) {
      url = options.url
    }
  }

  const isSpecialCase =
    ['/', '?', ':'].includes(url[0]) ||
    ['/', '?', ':'].includes(url[url.length - 1])

  if (customFetch.baseUrl) {
    if (!url) {
      url = customFetch.baseUrl
    } else {
      url = isSpecialCase
        ? `${customFetch.baseUrl}${url}`
        : `${customFetch.baseUrl}/${url}`
    }
  }

  if (options?.params) {
    url = `${url}?${objToQuery(options.params)}`
  }

  url = window.encodeURI(url)

  if (!url) {
    throw new Error('URL must be provided')
  }

  const reqId = getReqId()

  let _options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    customCache: false,
    log: false,
    signal: customFetch.abortControllers[reqId].signal
  } as Options

  if (typeof options === 'object') {
    _options = {
      ..._options,
      ...options
    }
  }

  if (
    _options.body &&
    (_options.headers as Record<string, string>)['Content-Type'] ===
      'application/json'
  ) {
    _options.body = JSON.stringify(_options.body)
  }

  if (customFetch.accessToken) {
    ;(_options.headers as Record<string, string>)[
      'Authorization'
    ] = `Bearer ${customFetch.accessToken}`
  }

  if (_options.log) {
    console.log(
      `%c Options: ${JSON.stringify(_options, null, 2)}`,
      'color: blue'
    )
  }

  if (
    (_options.method === 'POST' || _options.method === 'PUT') &&
    !_options.body
  ) {
    console.warn('Body is missing')
  }

  const handlers = options?.handlers

  if (handlers?.onAbort) {
    customFetch.abortControllers[reqId].signal.addEventListener(
      'abort',
      handlers.onAbort,
      {
        once: true
      }
    )
  }

  if (
    _options.method === 'GET' &&
    _options.customCache &&
    customFetchCache.has(url)
  ) {
    const cachedData: FetchResponse<T> = customFetchCache.get(url)
    return handlers?.onSuccess ? handlers.onSuccess(cachedData) : cachedData
  }

  try {
    const response = await fetch(url, _options)

    const { status, statusText } = response

    const info = {
      headers: [...response.headers.entries()].reduce((a, [k, v]) => {
        a[k] = v
        return a
      }, {} as Record<string, string>),
      status,
      statusText,
      url: response.url
    }

    let data: any = null

    const contentTypeHeader = response.headers.get('Content-Type')

    if (contentTypeHeader) {
      if (contentTypeHeader.includes('json')) {
        data = await response.json()
      } else if (contentTypeHeader.includes('text')) {
        data = await response.text()

        if (data.includes('Error:')) {
          const errorMessage = data
            .match(/Error:.[^<]+/)[0]
            .replace('Error:', '')
            .trim()

          if (errorMessage) {
            data = errorMessage
          }
        }
      } else {
        data = response
      }
    } else {
      data = response
    }

    let result: Awaited<FetchResponse<T>>

    if (response.ok) {
      result = { data, error: null, info }

      if (_options.method === 'GET' && _options.customCache) {
        customFetchCache.set(url, result)
      }

      if (_options.log) {
        console.log(
          `%c Result: ${JSON.stringify(result, null, 2)}`,
          'color: green'
        )
      }

      delete customFetch.abortControllers[reqId]

      return handlers?.onSuccess ? handlers.onSuccess(result) : result
    }

    result = {
      data: null,
      error: data,
      info
    }

    if (_options.log) {
      console.log(`%c Result: ${JSON.stringify(result, null, 2)}`, 'color: red')
    }

    delete customFetch.abortControllers[reqId]

    return handlers?.onError ? handlers.onError(result) : result
  } catch (err) {
    if (handlers?.onError) {
      handlers.onError(err)
    }
    delete customFetch.abortControllers[reqId]
    console.error(err)
    return {
      data: null,
      error: err,
      info: null
    }
  }
}

customFetch.baseUrl = ''
customFetch.accessToken = ''
customFetch.abortControllers = {}
customFetch.currentRequestId = ''
customFetch.cancel = (reqId?: string) => {
  if (reqId) {
    customFetch.abortControllers[reqId].abort()
  } else {
    customFetch.abortControllers[customFetch.currentRequestId].abort()
  }
}

customFetch.get = (url, options) => {
  if (typeof url === 'string') {
    return customFetch({
      url,
      ...options
    })
  }
  return customFetch({
    ...url
  })
}

customFetch.post = (url, body, options) => {
  if (typeof url === 'string') {
    return customFetch({
      url,
      method: 'POST',
      body: body as BodyInit,
      ...options
    })
  }
  return customFetch({
    method: 'POST',
    body: url,
    ...(body as Options)
  })
}

customFetch.update = (url, body, options) => {
  if (typeof url === 'string') {
    return customFetch({
      url,
      method: 'PUT',
      body: body as BodyInit,
      ...options
    })
  }
  return customFetch({
    method: 'PUT',
    body: url,
    ...(body as Options)
  })
}

customFetch.remove = (url, options) => {
  if (typeof url === 'string') {
    return customFetch({
      url,
      method: 'DELETE',
      ...options
    })
  }
  return customFetch({
    method: 'DELETE',
    ...url
  })
}

export default customFetch
