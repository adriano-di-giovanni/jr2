import { isArray, isObject } from '../validation/index'
export default value => isArray(value) || isObject(value)
