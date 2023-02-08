# Utils

Living Gentleman's Set of Useful JavaScript Utilities.

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
- `equal<T = object>(objA: T, objB: T)`: deeply compares `objA` and `objB`

### Function

- `curry(fn: Function)`
- `partial(fn: Function, ...args: any[])`
- `debounce(fn: Function, ms: number)`
- `throttle(fn: Function, ms: number)`
- `measureAsync(fn: Function, ...args: any[])`
- `measureSync(fn: Function, ...args: any[])`
- `memo(fn: Function, cacheKey?: any)`: by default `args.length ? JSON.stringify(args) : fn.name` used as key for cache
- `pipeAsync(...fns: Function[])`
- `pipeSync(...fns: Function[])`
- `sleep(ms: number)`

### Common

- `empty(val: any)`
- `size(val: any)`
- `type(val: any)`
- `fake(len = 1, fields: Field[])`: see examples below
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
- `customFetch<T>(options: Options): FetchResponse<T>`: see examples below
- `intl`: set of functions to work with locale sensitive data; see examples below
- `observeIntersection(el: Element, cb: Function, options?: IntersectionObserverInit)`: see examples below
- `observeMutations(el: Element, cb: Function, options: MutationObserverInit = { childList: true, attributes: true, subtree: true })`: see examples below
- `visibilityChange(onHidden?: Function, onVisible?: Function)`
- `worker(fn: Function, ...args: any[])`: executes `fn` in [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Examples

### truncate

```ts
const str = 'JavaScript'
const truncated = truncate(str, 4)
console.log(truncated) // Java...

const truncated2 = truncate(str, 4, '?')
console.log(truncated2) // Java?
```

### wrap

```ts
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

> wip