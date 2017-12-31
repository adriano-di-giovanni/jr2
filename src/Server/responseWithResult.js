export default id => result => {
    if (typeof id === 'undefined') {
        throw new Error('Unexpected call.')
    }

    if (typeof result === 'undefined') {
        throw new Error("Missing argument, 'result'.")
    }

    return {
        jsonrpc: '2.0',
        result,
        id,
    }
}
