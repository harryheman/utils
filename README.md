# Utils

Useful JavaScript Utilities.

- [Installation](#installation)
- [Usage](#usage)
- [List](#list)
  - [Number](#number)
  - [String](#string)
  - [Array](#array)
  - [Object](#object)
  - [Function](#function)
  - [Common](#common)
  - [Web API](#web-api)
- [Examples](#examples)
  - [truncate](#truncate)
  - [wrap](#wrap)
  - [chunk](#chunk)
  - [iterable](#iterable)
  - [equal](#equal)
  - [memo](#memo)
  - [memoAsync](#memoasync)
  - [pipe](#pipe)
  - [pipeAsync](#pipeasync)
  - [fake](#fake)
  - [customFetch](#customfetch)
  - [intl](#intl)

## Installation

```bash
yarn add @my-js/utils
# or
npm i @my-js/utils
```

## Usage

```js
import { randInt } from '@my-js/utils'

const int = randInt(1, 10)

console.log(int) // 6
```

## List

### Number

- `randInt(min: number, max: number)`
- `sortNum(arr: number[], asc = true)`
- `range(stop: number, start = 0, step = 1): [start, step, ...stop)`

### String

- `escape(str: string)`: converts `&<>'"` to `&amp;&lt;&gt;&#39;&quot;`
- `unescape(str: string)`
- `randStr(len = 10, symbols = UPPER + LOWER + NUM)`:
  - `UPPER`: `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`,
  - `LOWER`: `'abcdefghijklmnopqrstuvwxyz'`,
  - `NUM`: `'0123456789'`
- `sortStr(arr: string[], acs = true)`:
  - `sortStr.locales: string | string[]`
  - `sortStr.options: Intl.CollatorOptions`
- `trim(str: string)`: removes all extra spaces
- `truncate(str: string, max: number, end = '...')`: [example](#truncate)
- `words(count = 3, minMax = [2, 10], cap = true)`: `cap: true` enables capitalization of each word:
  - `capitilize(word: string)`
- `wrap(str: string, max: number, end = '\n')`: [example](#wrap)

### Array

- `choice<T>(arr: T[]): random T`
- `chunk<T>(arr: T[], size: number): T[] | T[][]`: [example](#chunk)
- `shuffle<T>(arr: T[])`

### Object

- `iterable<T extends object>(obj: T)`: makes `obj` iterable; [example](#iterable)
- `equal<T>(objA: T, objB: T)`: deeply compares `objA` and `objB`: [example](#equal)

### Function

- `curry(fn: Function)`
- `partial(fn: Function, ...args: any[])`
- `debounce(fn: Function, ms: number)`
- `throttle(fn: Function, ms: number)`
- `measure(fn: Function, ...args: any[])`
- `measureAsync(fn: Function, ...args: any[])`
- `memo(fn: Function, cacheKey?: any)`: by default `args.length ? JSON.stringify(args) : fn.name` used as key for cache; [example](#memo)
- `memoAsync(fn: Function, cacheKey?: any)`: [example](#memoAsync)
- `pipe(...fns: Function[])`: [example](#pipe)
- `pipeAsync(...fns: Function[])`: [example](#pipeAsync)
- `sleep(ms: number)`

### Common

- `empty(val: any)`
- `size(val: any)`
- `type(val: any)`
- `fake(len = 1, fields: Field[])`: returns fake data; [example](#fake)
- `mask(val: string | number, count: number, mask = '*')`
- `randColor()`: returns random HEX color

### Web API

- `clickInside(el: Element, cb: Function)`
- `clickOutside(el: Element, cb: Function)`
- `copyText(str: string): Promise<void>`: copies text to clipboard
- `pasteText(el: Element): Promise<void>`: pastes text from clipboard to `el.textContent`
- `formToObj<T>(form: HTMLFormElement): T`
- `formToQuery(form: HTMLFormElement): string`
- `objToQuery<T extends {}>(obj: T): string`
- `queryToObj<T>(q: string): T`
- `cookieToObj<T>(str: string): T`: JSDoc example available
- `objToCookie<T extends {}>(obj: T): string`: JSDoc example available
- `uuid(): string`: JSDoc example available
- `hash(str: string): Promise<string>`: JSDoc example available
- `customFetch<T>(options: Options): FetchResponse<T>`: advanced version of [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch); [example](#customFetch)
- `intl`: set of functions to work with locale sensitive data; [example](#intl)
- `observeIntersection(el: Element, cb: Function, options?: IntersectionObserverInit)`
- `observeMutations(el: Element, cb: Function, options: MutationObserverInit = { childList: true, attributes: true, subtree: true })`
- `visibilityChange(onHidden?: Function, onVisible?: Function)`
- `worker(fn: Function, ...args: any[])`: executes `fn` in [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Examples

### truncate

```ts
import { truncate } from '@my-js/utils'

const str = 'JavaScript'
const truncated = truncate(str, 4)
console.log(truncated) // Java...

const truncated2 = truncate(str, 4, '?')
console.log(truncated2) // Java?
```

### wrap

```ts
import { wrap } from '@my-js/utils'

const str =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, veniam?'
const wrapped = wrap(str, 30)
console.log(wrapped)
/*
  Lorem, ipsum dolor sit amet
  consectetur adipisicing elit.
  Est, veniam?
*/
```

### chunk

```ts
import { chunk } from '@my-js/utils'

const arr = [1, 2, 3, 4, 5]
const chunked = chunk(arr, 2)
console.log(chunked)
/*
  [
    [1, 2],
    [3, 4],
    [5]
  ]
*/
```

### iterable

```ts
import { iterable } from '@my-js/utils'

const user = {
  name: 'Harry',
  age: 32
}

const iter = iterable<typeof user>(user)
for (const v of iter) {
  console.log(v)
}
/*
  Harry
  32
*/
```

### equal

```ts
import { equal } from '@my-js/utils'

const objA = {
  name: 'Harry',
  job: {
    position: 'Chief Engineer'
  }
}
const objB = {
  name: 'Harry',
  job: {
    position: 'Chief Engineer'
  }
}
console.log(equal(objA, objB)) // true

// or `new Set()`
const mapA = new Map()
mapA.set('name', 'Harry')
const job = { position: 'Chief Engineer' }
mapA.set('job', job)

const mapB = new Map()
mapB.set('name', 'Harry')
mapB.set('job', job)
console.log(equal(mapA, mapB)) // true

const mapC = new Map()
mapC.set('name', 'Harry')
mapC.set('job', { position: 'Chief Engineer' })
console.log(equal(mapB, mapC)) // false

const objC = {
  0: 'Harry',
  1: 32
}
// just for demonstration purposes
const arr = ['Harry', 32] as unknown as typeof objC
console.log(equal(objC, arr)) // false

// can be used in `React.useEffect` or `React.memo`
```

### memo

```ts
import { memo, measure } from '@my-js/utils'

const fact = (n: number): number => (n < 2 ? n : n * fact(n - 1))
const memoFact = memo(fact)
// result calculates
console.log(measure(memoFact, 10000).toFixed(2)) // 0.30
// result delivers from cache
console.log(measure(memoFact, 10000).toFixed(2)) // 0
```

### memoAsync

```ts
import { measureAsync, memoAsync } from '@my-js/utils'

const fetchUserById = memoAsync((id: number) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
)

console.log(Math.round(await measureAsync(fetchUserById, 1))) // 60
console.log(Math.round(await measureAsync(fetchUserById, 1))) // 0
```

### pipe

```ts
import { pipe } from '@my-js/utils'

const toUpperCase = (str) => str.toUpperCase()
const removeSpaces = (str) => str.replace(/\s/g, '')
const addExclamation = (str) => str + '!'

const format = pipe(toUpperCase, removeSpaces, addExclamation)
console.log(format('hello world')) // HELLOWORLD!
```

### pipeAsync

```ts
const sayHiAndSleep = async (name: string) => {
  console.log(`Hi, ${name}!`)
  await sleep(1000)
  return name.toUpperCase()
}
const askQuestionAndSleep = async (name: string) => {
  console.log(`How are you, ${name}?`)
  await sleep(1000)
  return new TextEncoder()
    .encode(name) // Uint8Array
    .toString()
    .replaceAll(',', '-')
}
const sayBi = async (name: string) => {
  console.log(`Bye, ${name}.`)
}

const speak = pipeAsync(sayHiAndSleep, askQuestionAndSleep, sayBi)
speak('Harry')
/*
  Hi, Harry!
  // waiting for 1s
  How are you, HARRY?
  // waiting for 1s
  Bye, 72-65-82-82-89.
*/
```

### fake

```ts
import { fake, randInt, range, TYPE, words } from '@my-js/utils'

const fields = [
  { name: 'id', type: TYPE.ID },
  { name: 'firstName', type: TYPE.STR, count: 1 },
  { name: 'lastName', type: TYPE.STR, count: 1 },
  { name: 'age', type: TYPE.NUM, minMax: [18, 65] },
  { name: 'isMarried', type: TYPE.BOOL },
  {
    name: 'company',
    type: TYPE.OBJ,
    fields: [
      {
        name: 'name',
        type: TYPE.STR,
        count: 3
      },
      {
        name: 'position',
        type: TYPE.STR,
        count: 2
      }
    ]
  },
  { name: 'scores', value: range(5).map(() => randInt(1, 10)) },
  { name: 'movies', value: range(5).map(() => words(randInt(1, 3))) },
  {
    name: 'friends',
    value: fake(2, [
      { name: 'id', type: TYPE.ID },
      { name: 'firstName', type: TYPE.STR, count: 1 },
      { name: 'lastName', type: TYPE.STR, count: 1 }
    ])
  }
]

const data = fake(1, fields)
console.log(JSON.stringify(data, null, 2))
/*
  [
    {
      "id": "ZvO3fE25Kq",
      "firstName": "Kwvan",
      "lastName": "Iaiazwlu",
      "age": 52,
      "isMarried": false,
      "company": {
        "name": "Kvh Iebz Tceysx",
        "position": "Wejg Ugkswkztsf"
      },
      "scores": [
        10,
        10,
        9,
        9,
        6
      ],
      "movies": [
        "Vlcpmtjqo",
        "Yldzevozge Wocr Pxgwdhwtf",
        "Avch Obtgwk",
        "Mpqld Gpnsmxe",
        "Xrpsqaqzb Sgloho"
      ],
      "friends": [
        {
          "id": "4RHtu6RyBH",
          "firstName": "Ticnf",
          "lastName": "Chk"
        },
        {
          "id": "8o9QwrgPXs",
          "firstName": "Ocjo",
          "lastName": "Jbjtl"
        }
      ]
    }
  ]
*/
```

### customFetch

```ts
import { customFetch } from '@my-js/utils'

// receives `options` object
const response = await customFetch({
  url: 'https://jsonplaceholder.typicode.com/todos/1',

/*
  // optional
  // results caching, `false` by default
  customCache: true,

  // logging, `false` by default
  log: true,

  // query params, converts to query string - `q=search`, `undefined` by default
  params: { q: 'search' },

  handlers: {
    onSuccess: (data) => {},
    onError: (error) => {},
    onAbort: () => {}
  }
*/
})
console.log(response)
/*
{
  "data": {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  "error": null,
  "info": {
    "headers": {
        "cache-control": "max-age=43200",
        "content-type": "application/json; charset=utf-8",
        "expires": "-1",
        "pragma": "no-cache"
    },
    "status": 200,
    "statusText": "",
    "url": "https://jsonplaceholder.typicode.com/todos/1"
  }
}
*/

// wrong URL
const response2 = await customFetch.get(
  'https://jsonplaceholder.typicod.com/todos/1'
  /* options */
)
console.log(response2)
/*
{
    "data": null,
    "error": Error,
    "info": null
}
*/

// let's suppose, that our server responds with
// `res.status(400).json({ message: 'Some required fields is missing' })`
const response3 = await customFetch.get('https://my-js.org')
console.log(response3)
/*
{
    "data": null,
    "error": {
      "message": "Some required fields is missing"
    },
    "info": {
      "status": 400
      // ...
    }
}
*/

// other method aliases
customFetch.post<T>(url: string | BodyInit, body?: BodyInit | Omit<Options, 'url'>, options?: Omit<Options, 'url'>)
customFetch.update<T>(url: string | BodyInit, body?: BodyInit | Omit<Options, 'url'>, options?: Omit<Options, 'url'>)
customFetch.remove<T>(url: string | BodyInit,options?: Omit<Options, 'url'>)

// we can also provide
customFetch.baseUrl = 'https://my-js.org/docs/'
customFetch.get('/guide/nextjs')
// final URL will be `https://my-js.org/docs/guide/nextjs`

// and
customFetch.accessToken = 'T0k3n'
// 'T0k3n' will be added to `headers` object - `Authorization: Bearer T0k3n`

// every request can be cancelled
customFetch.cancel(customFetch.currentRequestId)
```

### intl

```ts
import { intl } from './index'

intl.locales = 'de'
console.log(intl.formatDate(new Date())) // 9.2.2023

intl.locales = 'en-US'
intl.dateOptions = {
  dateStyle: 'long',
  timeStyle: 'medium'
}
console.log(intl.formatDate(new Date()))
// February 9, 2023 at 10:35:20 PM

intl.numberOptions = {
  style: 'currency',
  currency: 'EUR'
}

const formatCurrency = intl.formatNumber
console.log(formatCurrency(100)) // €100.00

intl.locales = 'fr'
console.log(formatCurrency(100)) // 100,00 €

// other options
intl.listOptions: Intl.ListFormatOptions
intl.compareOptions: Intl.CollatorOptions

// other methods
intl.formatList(list?: Iterable<string>)
intl.compareValues(values?: string | string[])
```

PRs are very welcome.