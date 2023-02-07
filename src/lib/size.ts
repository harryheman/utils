const size = (val: any) => {
  return [undefined, null].includes(val)
    ? 0
    : val.length || val.size || typeof val === 'object'
    ? Object.keys(val).length
    : String(val).length
}

export default size
