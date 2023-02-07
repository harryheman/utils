const formToQuery = (form: HTMLFormElement) =>
  [...new FormData(form)]
    .map(([k, v]) => window.encodeURIComponent(`${k}=${v}`))
    .join('&')

export default formToQuery
