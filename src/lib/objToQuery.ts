const objToQuery = (obj = {}) =>
  window.encodeURIComponent(new URLSearchParams(obj).toString())

export default objToQuery
