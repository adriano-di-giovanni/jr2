import isRequest from '../isRequest'

it('should be a function', () => {
    expect(typeof isRequest).toBe('function')
})

it('should fail if value is missing', () => {
    expect(isRequest()).toBe(false)
})

it('should fail if value is not an object', () => {
    expect(isRequest(1)).toBe(false)
})

it('should fail if value has no jsonrpc field', () => {
    expect(isRequest({ method: '' })).toBe(false)
})

it('should fail if value has invalid jsonrpc field', () => {
    expect(isRequest({ jsonrpc: '1.0', method: '' })).toBe(false)
})

it('should fail if value has no method field', () => {
    expect(isRequest({ jsonrpc: '2.0' })).toBe(false)
})

it('should fail if value has invalid method field', () => {
    expect(isRequest({ jsonrpc: '2.0', method: 1 })).toBe(false)
})

it('should fail if value has invalid params field', () => {
    expect(isRequest({ jsonrpc: '2.0', method: '', params: 1 })).toBe(false)
})

it('should fail if value has invalid id field', () => {
    expect(isRequest({ jsonrpc: '2.0', method: '', id: true })).toBe(false)
})

it('should succeed if value is a notification', () => {
    expect(isRequest({ jsonrpc: '2.0', method: 'notify' })).toBe(true)
})

it('should succeed if value is a request', () => {
    expect(
        isRequest({
            jsonrpc: '2.0',
            method: 'sum',
            params: [23, 42],
            id: 1,
        })
    ).toBe(true)
})
