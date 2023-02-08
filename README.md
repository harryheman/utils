# Utils

Living Gentleman's Set of Useful JavaScript Utilities.

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
  - [pipeAsync](#pipeasync)
  - [fake](#fake)

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
- `range(stop: number, start = 0, step = 1): [start, step, step, ...stop]`

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

- `choice<T = any>(arr: T[]): random T`
- `chunk<T = any>(arr: T[], count: number): T[] | T[][]`: [example](#chunk)
- `shuffle<T = any>(arr: T[])`

### Object

- `iterable(obj: object)`: makes `obj` iterable; [example](#iterable)
- `equal<T = object>(objA: T, objB: T)`: deeply compares `objA` and `objB`: [example](#equal)

### Function

- `curry(fn: Function)`
- `partial(fn: Function, ...args: any[])`
- `debounce(fn: Function, ms: number)`
- `throttle(fn: Function, ms: number)`
- `measure(fn: Function, ...args: any[])`
- `measureAsync(fn: Function, ...args: any[])`
- `memo(fn: Function, cacheKey?: any)`: by default `args.length ? JSON.stringify(args) : fn.name` used as key for cache; [example](#memo)
- `pipe(...fns: Function[])`
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
- `formToObj(form: HTMLFormElement)`
- `formToQuery(form: HTMLFormElement)`
- `objToQuery(obj: object)`
- `queryToObj(str: string)`
- `customFetch<T>(options: Options): FetchResponse<T>`: advanced version of [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch); [example](#customFetch)
- `intl`: set of functions to work with locale sensitive data; [example](#intl)
- `observeIntersection(el: Element, cb: Function, options?: IntersectionObserverInit)`: [example](#observeIntersection)
- `observeMutations(el: Element, cb: Function, options: MutationObserverInit = { childList: true, attributes: true, subtree: true })`: [example](#observeMutations)
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

// or new Set()
const mapA = new Map()
mapA.set('name', 'Harry')
const job = { position: 'Chief Engineer' }
mapA.set('job', job)

const mapB = new Map()
mapB.set('name', 'Harry')
mapB.set('job', job)
console.log(equal(mapA, mapB)) // true

const mapC = new Map()
mapB.set('name', 'Harry')
mapB.set('job', { position: 'Chief Engineer' })
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
  // waiting 1s
  How are you, HARRY?
  // waiting 1s
  Bye, 72-65-82-82-89.
*/
```

### fake

```ts
import { fake, randInt, range, TYPE, words } from '@my-js/utils'

const fields = [
  { name: 'id', type: TYPE.ID },
  { name: 'firstName', type: TYPE.STR, count: 2 },
  { name: 'lastName', type: TYPE.STR, count: 2 },
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
      { name: 'firstName', type: TYPE.STR, count: 2 },
      { name: 'lastName', type: TYPE.STR, count: 2 }
    ])
  }
]

const data = fake(1, fields)
console.log(JSON.stringify(data, null, 2))
/*
  [
    {
      "id": "U0IXsmCb53",
      "firstName": "Awhsjqjii Zdtrs Lrysnjn",
      "lastName": "Aoroagbph Ivculxy Qlpy",
      "age": 61,
      "isMarried": false,
      "company": {
        "name": "Pixpjrlnyu Grhdyr Ko Ccdditq",
        "position": "Tg Fy Yiuossmpj"
      },
      "scores": [
        2,
        1,
        1,
        6,
        9,
        3
      ],
      "movies": [
        "Kta Ehhohrbfzn",
        "Ywjurtgubo Tltnkhlq",
        "Hfugktfhb Kmbo",
        "Ljej Ntzxz",
        "Hlotahsqf Uvmg Jblmeqk Pkdo",
        "Qfndmtxwxs Xzmifhkb"
      ],
      "friends": [
        {
          "id": "oJL44Q5CiW",
          "firstName": "Rtm Jtvuarzmzy Udpxnouwzk",
          "lastName": "Mgvyssuf Cbirag Qaf"
        },
        {
          "id": "1WUPCfEZtg",
          "firstName": "Yjurpywahy Ckqz Hzebgfjp",
          "lastName": "Tkxjfi Pnhx Pftfix"
        }
      ]
    }
  ]
*/
```

> wip