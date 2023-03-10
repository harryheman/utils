const formToObj = <T>(form: HTMLFormElement) =>
  Object.fromEntries(new FormData(form).entries()) as T

export default formToObj
