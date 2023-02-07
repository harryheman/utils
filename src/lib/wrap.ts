const wrap = (str: string, max: number, br = '\n') =>
  str.replace(
    new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'),
    '$1' + br
  )

export default wrap
