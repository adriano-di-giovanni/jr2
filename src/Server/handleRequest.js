import { isArray, isObject } from '../validation/index'
import { isRequest, isResponse } from '../rpcValidation/index'
import map from './map'
import parseJSON from './parseJSON'
import responseWithError from './responseWithError'
import responseWithResult from './responseWithResult'

export default function handleRequest(value, isBatching, done) {
    const thisArg = this
    let response

    if (typeof value === 'string') {
        parseJSON(value, (err, result) => {
            if (err) {
                response = {
                    jsonrpc: '2.0',
                    error: {
                        code: -32700,
                        message: 'Parse error',
                    },
                    id: null,
                }
                done(null, response)
                return
            }
            handleRequest.call(thisArg, result, isBatching, done)
        })
        return
    }

    if (isArray(value) && value.length > 0 && !isBatching) {
        const iteratee = (element, callback) => handleRequest.call(thisArg, element, true, callback)
        map(value, iteratee, (err, results) => {
            if (err) {
                done(err)
                return
            }

            // NOTE:
            // when request is a notification, response is undefined.
            // Filter out undefined results
            const response = results.filter(isObject)
            done(null, response.length > 0 ? response : void 0)
        })
        return
    }

    if (isRequest(value)) {
        execute.call(thisArg, value, done)
        return
    }

    response = {
        jsonrpc: '2.0',
        error: {
            code: -32600,
            message: 'Invalid request',
        },
        id: null,
    }

    done(null, response)
}

function execute(request, done) {
    const { method, params, id } = request
    const { delegate } = this
    let response

    const isNotification = () => typeof id === 'undefined'

    if (typeof delegate[method] !== 'function') {
        if (isNotification()) {
            done()
            return
        }

        response = {
            jsonrpc: '2.0',
            error: {
                code: -32601,
                message: 'Method not found',
            },
            id: id || null,
        }
        done(null, response)
        return
    }

    const context = {
        isNotification,
        responseWithResult: responseWithResult(id),
        responseWithError: responseWithError(id),
    }

    delegate[method](params, context, (err, response) => {
        if (err) {
            done(err)
            return
        }

        if (isNotification() && typeof response !== 'undefined') {
            throw new Error('Invalid response')
        }

        if (!isNotification() && !isResponse(response)) {
            throw new Error('Missing or invalid response.')
        }

        done(null, response)
    })
}
