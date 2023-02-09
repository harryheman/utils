export type IntlT = {
  locales: string | string[]
  dateOptions: Intl.DateTimeFormatOptions
  numberOptions: Intl.NumberFormatOptions
  listOptions: Intl.ListFormatOptions
  compareOptions: Intl.CollatorOptions
  formatDate: (date?: number | Date) => string
  formatNumber: (num?: number | bigint) => string
  formatList: (list?: Iterable<string>) => string
  compareValues: (values?: string | string[]) => number
}

const intl: IntlT = {
  locales: [],
  dateOptions: {},
  numberOptions: {},
  listOptions: {},
  compareOptions: {},
  formatDate: (date = new Date()) =>
    new Intl.DateTimeFormat(intl.locales, intl.dateOptions).format(
      new Date(date)
    ),
  formatNumber: (number = 0) =>
    new Intl.NumberFormat(intl.locales, intl.numberOptions).format(number),
  formatList: (list = []) => {
    if (typeof list === 'string') {
      list = list
        .replace(/[\[\]]/g, '')
        .split(/[,;]/)
        .map((item) => item.replace(/['"`]/g, '').trim())
    }
    return new Intl.ListFormat(intl.locales, intl.listOptions).format(list)
  },
  compareValues: (values: string | string[] = []) => {
    if (typeof values === 'string') {
      values = values
        .replace(/[\[\]]/g, '')
        .split(/[,;]/)
        .map((item) => item.replace(/['"`]/g, '').trim())
    }
    return new Intl.Collator(intl.locales, intl.compareOptions).compare(
      ...(values as [string, string])
    )
  }
}

export default intl
