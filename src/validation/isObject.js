import toString from './toString'
export default value => /^\[object Object\]$/.test(toString.call(value))
