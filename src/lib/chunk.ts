const chunk = <T = any>(arr: T[], count: number) => {
  if (arr.length < count) return arr
  const _arr = []
  for (let i = 0; i < arr.length; i += count) {
    _arr.push(arr.slice(i, i + count))
  }
  return _arr
}

export default chunk
