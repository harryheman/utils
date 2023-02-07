const formToObj = (form: HTMLFormElement) =>
  Object.fromEntries(new FormData(form).entries())

export default formToObj
