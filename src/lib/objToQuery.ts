const objToQuery = <T extends {}>(obj: T) =>
  '?' + new URLSearchParams(obj).toString()

export default objToQuery
