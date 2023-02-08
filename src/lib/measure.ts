const measure = (fn: Function, ...args: any[]) => {
  const start = performance.now()
  fn(...args)
  return performance.now() - start
}

export default measure
