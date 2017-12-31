import responseWithResult from '../responseWithResult'

it('should be a function', () => {
    expect(typeof responseWithResult).toBe('function')
})

it('should return a function', () => {
    expect(typeof responseWithResult(1)).toBe('function')
})

it('should throw if request is a notification (id is undefined)', () => {
    expect(() => {
        responseWithResult()('OK')
    }).toThrow(/Unexpected call/)
})

it('should throw if result is missing', () => {
    expect(() => {
        responseWithResult(1)()
    }).toThrow(/Missing argument/)
})
