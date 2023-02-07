const pasteText = async (element: HTMLElement) => {
  const text = await navigator.clipboard.readText()
  element.textContent = text
}

export default pasteText
