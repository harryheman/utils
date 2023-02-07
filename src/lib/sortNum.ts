const sortNum = (arr: number[], asc = true) =>
  arr.sort((x, y) => (asc ? x - y : y - x))

export default sortNum
