const memoAsync = (fn: Function, cacheKey?: any) => {
  const cache = new Map()

  return async (...args: any[]) => {
    const key = cacheKey || args.length ? JSON.stringify(args) : fn.name

    if (cache.has(key)) {
      return cache.get(key)
    } else {
      const result = await fn(...args)
      cache.set(key, result)
      return result
    }
  }
}

export default memoAsync
