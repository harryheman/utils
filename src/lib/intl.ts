const formatDateTime = (date = new Date()) =>
  new Intl.DateTimeFormat(
    formatDateTime.locales,
    formatDateTime.options
  ).format(new Date(date))

formatDateTime.locales = [] as string | string[]
formatDateTime.options = {} as Intl.DateTimeFormatOptions

const formatNumber = (number = 0) =>
  new Intl.NumberFormat(formatNumber.locales, formatNumber.options).format(
    number
  )

formatNumber.locales = [] as string | string[]
formatNumber.options = {} as Intl.NumberFormatOptions

const formatList = (list: string | string[] = []) => {
  if (typeof list === 'string') {
    list = list
      .replace(/[\[\]]/g, '')
      .split(/[,;]/)
      .map((item) => item.replace(/['"`]/g, '').trim())
  }
  return new Intl.ListFormat(formatList.locales, formatList.options).format(
    list
  )
}

formatList.locales = [] as string | string[]
formatList.options = {} as Intl.ListFormatOptions

const compareValues = (values: string | string[] = []) => {
  if (typeof values === 'string') {
    values = values
      .replace(/[\[\]]/g, '')
      .split(/[,;]/)
      .map((item) => item.replace(/['"`]/g, '').trim())
  }
  return new Intl.Collator(
    compareValues.locales,
    compareValues.options
  ).compare(...(values as [string, string]))
}

compareValues.locales = [] as string | string[]
compareValues.options = {} as Intl.CollatorOptions

export { formatDateTime, formatNumber, formatList, compareValues }
