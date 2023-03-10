/**
 * @example
 * const obj = { a: 1, b: [2, 3], c: { foo: 'bar' } }
 * await hash(JSON.stringify(obj))
 * // "79f2004818357f37635ae76481e2654130f56a0ce55e05ecc0d3c455cafdff60"
 */
const hash = (str: string) =>
  crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then((h) => {
    const hexes = []
    const view = new DataView(h)
    for (let i = 0; i < view.byteLength; i += 4) {
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8))
    }
    return hexes.join('')
  })

export default hash
