import toString from './toString'
export default value => /^\[object String\]$/.test(toString.call(value))
