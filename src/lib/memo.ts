const memo = (fn: Function, cacheKey?: any) => {
  const cache = new Map()

  return (...args: any[]) => {
    const key = cacheKey || args.length ? JSON.stringify(args) : fn.name

    if (cache.has(key)) {
      return cache.get(key)
    } else {
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
  }
}

export default memo
