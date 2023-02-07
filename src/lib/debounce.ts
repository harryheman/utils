const debounce = (fn: Function, ms: number) => {
  let id: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    clearTimeout(id)

    id = setTimeout(() => {
      fn(...args)
      clearTimeout(id)
    }, ms)
  }
}

export default debounce
