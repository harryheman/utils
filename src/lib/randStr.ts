import randInt from './randInt'

export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LOWER = 'abcdefghijklmnopqrstuvwxyz'
export const NUM = '0123456789'

const randStr = (len = 10, symbols = UPPER + LOWER + NUM) => {
  let _str = ''
  const max = symbols.length - 1
  for (let i = 1; i <= len; i++) {
    const i = randInt(0, max)
    _str += symbols[i]
  }
  return _str
}

export default randStr
