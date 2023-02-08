const pasteText = async (el: Element) => {
  const text = await navigator.clipboard.readText()
  el.textContent = text
}

export default pasteText
