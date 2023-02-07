const pipeAsync =
  (...fns: Function[]) =>
  (...args: any[]) =>
    fns.reduce(
      (prevFn, nextFn) => prevFn.then(nextFn as any),
      Promise.resolve(args)
    )

export default pipeAsync
