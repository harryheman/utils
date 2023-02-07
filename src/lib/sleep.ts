const sleep = (ms: number) =>
  new Promise((r) => {
    const id = setTimeout(() => {
      r(undefined)
      clearTimeout(id)
    }, ms)
  })

export default sleep
