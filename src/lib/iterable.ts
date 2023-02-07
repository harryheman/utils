const iterable = (obj: object) => {
  Object.defineProperties(obj, {
    length: {
      value: Object.keys(obj).length
    },

    [Symbol.iterator]: {
      value: function* () {
        for (const i in this) {
          yield this[i]
        }
      }
    }
  })

  return obj
}

export default iterable
