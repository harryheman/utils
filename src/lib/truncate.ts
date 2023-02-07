const truncate = (str: string, max: number, end = '...') =>
  str.length > max ? str.slice(0, max > 3 ? max : 3) + end : str

export default truncate
