import { isId, isMethod, isParams } from '../rpcValidation/index'

/**
 * JSON-RPC 2.0 compliant client
 */
export default class Client {
    /**
     * Creates a compliant request
     *
     * @param {String} method The name of the method to invoke on the server.
     * @param {Array|Object} params An array of positional parameters or an object
     * for named parameters. It can also be undefined.
     * @param {Number|String} id A number or a string identifying the request. If omitted, request
     * is a notification.
     * @returns {Object} The JSON-RPC 2.0 compliant request.
     */
    request(method, params, id) {
        if (!isMethod(method)) {
            throw new Error("Missing or invalid 'method'")
        }

        const request = {
            jsonrpc: '2.0',
            method,
        }

        if (params != null) {
            if (!isParams(params)) {
                throw new Error("Invalid 'params'")
            }
            request.params = params
        }

        if (typeof id !== 'undefined') {
            if (!isId(id)) {
                throw new Error("Invalid 'id'")
            }
            request.id = id
        }

        return request
    }
}
