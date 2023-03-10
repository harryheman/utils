/**
 * @example
 * const obj = { foo: "bar", equation: "E=mc^2" }
 * objToCookie(obj)
 * // "foo=bar; equation=E%3Dmc%5E2"
 */
const objToCookie = <T extends {}>(obj: T) =>
  Object.keys(obj)
    .map(
      (k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(obj[k as keyof {}])}`,
    )
    .join('; ')

export default objToCookie
