const clickInside = (el: Element, cb: Function) => {
  document.addEventListener('click', (e) => {
    if (el.contains(e.target as Node | null)) cb()
  })
}

export default clickInside
