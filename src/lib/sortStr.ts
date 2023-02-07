const sortStr = (str: string, asc = true) =>
  [...str]
    .sort((a, b) => (asc ? a.localeCompare(b) : b.localeCompare(a)))
    .join('')

export default sortStr
