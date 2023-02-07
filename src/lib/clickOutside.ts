const clickOutside = (element: Element, callback: Function) => {
  document.addEventListener('click', (e) => {
    if (!element.contains(e.target as Node | null)) callback()
  })
}

export default clickOutside
