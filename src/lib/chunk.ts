const chunk = <T>(arr: T[], size: number) => {
  if (arr.length < size) return arr
  const _arr = []
  for (let i = 0; i < arr.length; i += size) {
    _arr.push(arr.slice(i, i + size))
  }
  return _arr
}

export default chunk
