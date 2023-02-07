const partial =
  (fn: Function, ...args: any[]) =>
  (...moreArgs: any[]) =>
    fn(...args, ...moreArgs)

export default partial
