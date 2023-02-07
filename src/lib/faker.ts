import randInt from './randInt'
import randStr from './randStr'
import range from './range'
import words from './words'

export const id = (len = 10) => randStr(len)
export const bool = () => (Math.random() > 0.5 ? true : false)

const fns = {
  id,
  num: randInt,
  str: words,
  bool
}

export enum TYPE {
  ID = 'id',
  NUM = 'num',
  STR = 'str',
  BOOL = 'bool',
  OBJ = 'obj'
}

export type Field = {
  name: string
  type?: TYPE
  value?: any
  count?: number
  minMax?: number[]
  fields?: Field[]
}

export default function faker(len = 1, fields: Field[]) {
  return range(len - 1).map(() =>
    fields.reduce((obj, field) => {
      const { type, name, value } = field

      if (!type) {
        obj[name] = value
      } else if (type === TYPE.OBJ) {
        obj[name] = faker(1, field.fields || [])[0]
      } else {
        const fn = fns[type]
        const args = field.minMax || [field.count]
        // @ts-ignore
        obj[name] = fn(...args)
      }

      return obj
    }, {} as Record<string, any>)
  )
}
