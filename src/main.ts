import iterable from './lib/iterable'

const obj = {
  name: 'Harry',
  age: 32
}

const iter = iterable<typeof obj>(obj)
for (const v of iter) {
  console.log(v)
}
