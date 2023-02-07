const observeMutations = (
  element: Element,
  callback: Function,
  options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true
  }
) => {
  const observer = new MutationObserver((ms) => ms.forEach((m) => callback(m)))

  observer.observe(element, options)

  return observer
}

export default observeMutations
