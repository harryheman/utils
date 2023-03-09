const shuffle = <T>(arr: T[]) => {
  let l = arr.length
  while (l) {
    const i = Math.floor(Math.random() * l--)
    ;[arr[l], arr[i]] = [arr[i], arr[l]]
  }
  return arr
}

export default shuffle
