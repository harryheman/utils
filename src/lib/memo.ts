const memo = (fn: Function, key: any) => {
  const cache = new Map()

  return (...args: any[]) => {
    const _key = key || args.length ? JSON.stringify(args) : fn.name

    if (cache.has(_key)) {
      return cache.get(_key)
    } else {
      const result = fn(...args)
      cache.set(_key, result)
      return result
    }
  }
}

export default memo
