import randInt from './randInt'

const choice = <T>(arr: T[]) => arr[randInt(0, arr.length - 1)]

export default choice
