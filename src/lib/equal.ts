function equal<T = object>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  if (
    (Array.isArray(objA) && !Array.isArray(objB)) ||
    (Array.isArray(objB) && !Array.isArray(objA))
  ) {
    return false
  }

  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false

    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false
      }
    }
    return true
  }

  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false

    for (const value of objA) {
      if (!objB.has(value)) {
        return false
      }
    }
    return true
  }

  if (objA instanceof Date && objB instanceof Date) {
    return Object.is(objA.getTime(), objA.getTime())
  }

  const keysA = Object.keys(objA)
  if (keysA.length !== Object.keys(objB).length) {
    return false
  }

  return keysA.every((key) => equal(objA[key as keyof T], objB[key as keyof T]))
}

export default equal
