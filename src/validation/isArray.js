import toString from './toString'
export default value => /^\[object Array\]$/.test(toString.call(value))
