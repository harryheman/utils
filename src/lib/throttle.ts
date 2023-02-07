const throttle = (fn: Function, ms: number) => {
  let id: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (id) return

    fn(...args)

    id = setTimeout(() => {
      clearTimeout(id as ReturnType<typeof setTimeout>)
      id = null
    }, ms)
  }
}

export default throttle
