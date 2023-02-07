const observeIntersection = (
  element: Element,
  callback: Function,
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver(
    ([entry]) => callback(entry),
    options
  )

  observer.observe(element)

  return observer
}

export default observeIntersection
