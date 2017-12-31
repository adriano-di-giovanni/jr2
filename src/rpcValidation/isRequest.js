import { isObject } from '../validation/index'
import { isId, isMethod, isParams, isVersion } from '../rpcValidation/index'

export default value => {
    if (!isObject(value)) {
        return false
    }

    const { jsonrpc, method, params, id } = value

    return (
        isVersion(jsonrpc) &&
        isMethod(method) &&
        (typeof params === 'undefined' || isParams(params)) &&
        (typeof id === 'undefined' || isId(id))
    )
}
