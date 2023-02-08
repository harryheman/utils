const pipe = (...fns: Function[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        g(f(...args))
  )

export default pipe
