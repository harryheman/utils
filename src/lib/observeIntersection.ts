const observeIntersection = (
  el: Element,
  cb: Function,
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver(([entry]) => cb(entry), options)

  observer.observe(el)

  return observer
}

export default observeIntersection
