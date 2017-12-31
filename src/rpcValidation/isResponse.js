import { isArray, isObject } from '../validation/index'
import isErrorCode from './isErrorCode'
import isErrorMessage from './isErrorMessage'
import isId from './isId'
import isVersion from './isVersion'

const isResponse = value => {
    if (isArray(value)) {
        return value.length > 0 && value.every(isResponse)
    }

    if (!isObject(value)) {
        return false
    }

    const { jsonrpc, result, error, id } = value

    const hasResult = typeof result !== 'undefined'
    const hasError = typeof error !== 'undefined'

    return (
        isVersion(jsonrpc) &&
        hasResult !== hasError &&
        (!hasError ||
            (isObject(error) && isErrorCode(error.code) && isErrorMessage(error.message))) &&
        isId(id)
    )
}

export default isResponse
