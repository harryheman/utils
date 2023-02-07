import randInt from './randInt'

const choice = <T = any>(arr: T[]) => arr[randInt(0, arr.length - 1)]

export default choice
