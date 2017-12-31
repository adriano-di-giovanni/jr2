import { isObject } from '../validation/index'
import handleRequest from './handleRequest'

/**
 * JSON-RPC 2.0 compliant server
 *
 * @class Server
 * @param {Object} delegate An object implementing server methods.
 */
export default class Server {
    constructor(delegate) {
        if (!isObject(delegate)) {
            throw new TypeError('Missing or invalid delegate. Object expected.')
        }
        this.delegate = delegate
    }

    /**
     * Handles a request
     *
     * @param {Array|Object|String} request The request to handle. If it is a string,
     * it is parsed before validation and execution of the related method. If it is an object,
     * it is validated and handled as a single request. If it is an array,
     * it is validated and handled as a batch request.
     * @param {Function} done The callback. It is invoked with `(err, response)`.
     */
    handle(request, done) {
        const callback = ensureCallback(done)
        handleRequest.call(this, request, false, callback)
    }
}

function ensureCallback(callback) {
    const type = typeof callback

    if (type === 'undefined') {
        return noop
    }

    if (type === 'function') {
        return callback
    }

    throw new TypeError('Invalid callback. Function expected.')
}

function noop() {}
