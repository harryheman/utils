const curry = (fn: Function) =>
  function _curry(...args: any[]) {
    return fn.length <= args.length
      ? fn(...args)
      : (...moreArgs: any[]) => _curry(...args, ...moreArgs)
  }

export default curry
