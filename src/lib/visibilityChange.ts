const visibilityChange = (onHidden?: Function, onVisible?: Function) => {
  document.addEventListener('visibilitychange', (e) => {
    if (document.visibilityState === 'hidden') {
      if (onHidden) {
        onHidden(e)
      }
    } else if (document.visibilityState === 'visible') {
      if (onVisible) {
        onVisible(e)
      }
    }
  })
}

export default visibilityChange
