const measureAsync = async (fn: Function, ...args: any[]) => {
  const start = performance.now()
  await fn(...args)
  return performance.now() - start
}

export default measureAsync
