import isResponse from '../isResponse'

it('should be a function', () => {
    expect(typeof isResponse).toBe('function')
})

it('should fail if value is missing', () => {
    expect(isResponse()).toBe(false)
})

it('should fail if value is not an array or an object', () => {
    expect(isResponse(1)).toBe(false)
})

it('should fail if value is an empty array', () => {
    expect(isResponse([])).toBe(false)
})

it('should fail if value is an empty object', () => {
    expect(isResponse({})).toBe(false)
})

it('should fail if value has no jsonrpc field', () => {
    expect(isResponse({ result: 'OK', id: 1 })).toBe(false)
})

it('should fail if value has invalid jsonrpc field', () => {
    expect(
        isResponse({
            jsonrpc: 2.0,
            result: 'OK',
            id: 1,
        })
    ).toBe(false)
})

it("should fail if value has both 'error' and 'result' fields", () => {
    expect(
        isResponse({
            jsonrpc: '2.0',
            error: { code: -32603, message: 'Internal error' },
            result: 'OK',
            id: 1,
        })
    ).toBe(false)
})

it('should succeed if value is a valid success response', () => {
    expect(
        isResponse({
            jsonrpc: '2.0',
            result: 'OK',
            id: 1,
        })
    ).toBe(true)
})

it('should succeed if value is a valid error response', () => {
    expect(
        isResponse({
            jsonrpc: '2.0',
            error: {
                code: -32603,
                message: 'Internal error',
            },
            id: 1,
        })
    ).toBe(true)
})

it('should succeed if value is a batch response', () => {
    expect(
        isResponse([
            { jsonrpc: '2.0', error: { code: -32603, message: 'Internal error' }, id: 1 },
            { jsonrpc: '2.0', result: 'OK', id: 2 },
        ])
    ).toBe(true)
})
