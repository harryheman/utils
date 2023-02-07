const queryToObj = (q: string) =>
  Object.fromEntries(new URLSearchParams(decodeURIComponent(q)).entries())

export default queryToObj
