const sortStr = (arr: string[], asc = true) =>
  arr.sort((a, b) => (asc ? a.localeCompare(b) : b.localeCompare(a)))

export default sortStr
