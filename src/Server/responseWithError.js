import { isErrorCode, isErrorMessage } from '../rpcValidation/index'

export default id => (code, message, data) => {
    if (typeof id === 'undefined') {
        throw new Error('Unexpected call.')
    }

    if (!isErrorCode(code)) {
        throw new Error("Missing or invalid argument 1, 'code'. Integer expected.")
    }

    if (!isErrorMessage(message)) {
        throw new Error("Missing or invalid argument 2, 'message'. String expected.")
    }

    const response = {
        jsonrpc: '2.0',
        error: {
            code,
            message,
        },
        id,
    }

    if (typeof data !== 'undefined') {
        response.error.data = data
    }

    return response
}
