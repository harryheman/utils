import randInt from './randInt'
import randStr, { LOWER } from './randStr'
import range from './range'

export const capitilize = (word: string) =>
  `${word[0].toUpperCase()}${word.slice(1)}`

const words = (count = 3, minMax = [2, 10] as [number, number], cap = true) =>
  range(count)
    .map(() => randStr(randInt(...minMax), LOWER))
    .map((w) => (cap ? capitilize(w) : w))
    .join(' ')

export default words
