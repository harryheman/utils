const iterable = <T extends object>(obj: T) => {
  Object.defineProperties(obj, {
    length: {
      value: Object.keys(obj).length,
    },

    [Symbol.iterator]: {
      value: function* () {
        for (const i in this) {
          yield this[i]
        }
      },
    },
  })

  return obj as T & {
    length: number
    [Symbol.iterator]: () => IterableIterator<T>
  }
}

export default iterable
