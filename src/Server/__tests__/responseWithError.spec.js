import responseWithError from '../responseWithError'

it('should be a function', () => {
    expect(typeof responseWithError).toBe('function')
})

it('should return a function', () => {
    expect(typeof responseWithError(1)).toBe('function')
})

it('should throw if request is a notification (id is undefined)', () => {
    expect(() => {
        responseWithError()(-32603, 'Internal error')
    }).toThrow(/Unexpected call/)
})

it('should throw if error code is missing', () => {
    expect(() => {
        responseWithError(1)(void 0, 'Internal error')
    }).toThrow(/Missing or invalid argument 1/)
})

it('should throw if error code is invalid', () => {
    expect(() => {
        responseWithError(1)('-32603', 'Internal error')
    }).toThrow(/Missing or invalid argument 1/)
})

it('should throw if error message is missing', () => {
    expect(() => {
        responseWithError(1)(-32603)
    }).toThrow(/Missing or invalid argument 2/)
})

it('should throw if error message is invalid', () => {
    expect(() => {
        responseWithError(1)(-32603, 1)
    }).toThrow(/Missing or invalid argument 2/)
})

it('should return an error response', () => {
    expect(responseWithError(1)(-32603, 'Internal error')).toEqual({
        jsonrpc: '2.0',
        error: {
            code: -32603,
            message: 'Internal error',
        },
        id: 1,
    })
})

it('should return an error response w/ data', () => {
    expect(responseWithError(1)(-32603, 'Internal error', 'data')).toEqual({
        jsonrpc: '2.0',
        error: {
            code: -32603,
            message: 'Internal error',
            data: 'data',
        },
        id: 1,
    })
})
