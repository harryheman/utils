import randInt from './randInt'

export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LOWER = 'abcdefghijklmnopqrstuvwxyz'
export const NUM = '0123456789'

const randStr = (len = 10, symbols = UPPER + LOWER + NUM): string => {
  let _str = ''
  const max = symbols.length - 1
  for (let i = 0; i < len; i++) {
    const i = randInt(0, max)
    let s = symbols[i]
    while (s.toLowerCase() === _str.at(-1)?.toLowerCase()) {
      const i = randInt(0, max)
      s = symbols[i]
    }
    _str += s
  }
  return _str
}

export default randStr
