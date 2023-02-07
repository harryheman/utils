export const formatDateTime = ({
  locale = [],
  date = Date.now(),
  ...options
}) => new Intl.DateTimeFormat(locale, options).format(new Date(date))

export const formatRelativeTime = ({
  locale = [],
  value = '1 day',
  ...options
}) => {
  const [amount, unit] = value.split(/[\s_]/)
  return new Intl.RelativeTimeFormat(locale, options).format(
    Number(amount),
    unit as Intl.RelativeTimeFormatUnit
  )
}

export const formatNumber = ({ locale = [], number = 0, ...options }) =>
  new Intl.NumberFormat(locale, options).format(number)

export const formatNames = ({
  locale = [],
  localeOf = 'en-US',
  type = 'language',
  ...options
}) =>
  new Intl.DisplayNames(locale, {
    type: type as Intl.DisplayNamesType,
    ...options
  }).of(localeOf)

type FormatListProps = {
  locale: string | string[]
  list: string | string[]
  [k: string]: any
}

export const formatList = ({
  locale = [],
  list = [],
  ...options
}: FormatListProps) => {
  if (typeof list === 'string') {
    list = list
      .replace(/[\[\]]/g, '')
      .split(/[,;]/)
      .map((item) => item.replace(/['"`]/g, '').trim())
  }
  return new Intl.ListFormat(locale, options).format(list)
}

type CompareValuesProps = {
  locale: string | string[]
  values: string | string[]
  [k: string]: any
}

export const compareValues = ({
  locale = [],
  values = [],
  ...options
}: CompareValuesProps) => {
  if (typeof values === 'string') {
    values = values
      .replace(/[\[\]]/g, '')
      .split(/[,;]/)
      .map((item) => item.replace(/['"`]/g, '').trim())
  }
  return new Intl.Collator(locale, options).compare(
    ...(values as [string, string])
  )
}

export const pluralize = ({ locale = [], number = 1, ...options }) =>
  new Intl.PluralRules(locale, options).select(number)
