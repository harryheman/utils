const sortStr = (arr: string[], asc = true) =>
  arr.sort((a, b) =>
    asc
      ? a.localeCompare(b, sortStr.locales, sortStr.options)
      : b.localeCompare(a, sortStr.locales, sortStr.options)
  )

sortStr.locales = [] as string | string[]
sortStr.options = {} as Intl.CollatorOptions

export default sortStr
