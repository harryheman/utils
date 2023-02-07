const type = (val: any) =>
  val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name

export default type
