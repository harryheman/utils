/**
 * @example
 * const cookieStr = 'foo=bar; equation=E%3Dmc%5E2'
 * cookieToObj(cookieStr)
 * // { foo: "bar", equation: "E=mc^2" }
 */
const cookieToObj = <T>(str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      const key = decodeURIComponent(v[0].trim()) as keyof T
      const val = decodeURIComponent(v[1].trim()) as T[keyof T]
      acc[key] = val
      return acc
    }, {} as T)

export default cookieToObj
