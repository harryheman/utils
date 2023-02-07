const mask = (val: string | number, count: number, mask = '*') =>
  `${val}`.slice(-count).padStart(`${val}`.length, mask)

export default mask
