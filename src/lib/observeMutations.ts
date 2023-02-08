const observeMutations = (
  el: Element,
  cb: Function,
  options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true
  }
) => {
  const observer = new MutationObserver((ms) => ms.forEach((m) => cb(m)))

  observer.observe(el, options)

  return observer
}

export default observeMutations
