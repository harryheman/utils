const range = (stop: number, start = 0, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
    Number(start + i * step)
  )

export default range
