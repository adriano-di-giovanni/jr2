import isErrorCode from '../isErrorCode'

it('should be a function', () => {
    expect(typeof isErrorCode).toBe('function')
})

it('should fail if value is not a number', () => {
    expect(isErrorCode('-32603')).toBe(false)
})

it('should fail if value is NaN', () => {
    expect(isErrorCode(NaN)).toBe(false)
})

it('should fail if value is not finite', () => {
    expect(isErrorCode(-Infinity)).toBe(false)
    expect(isErrorCode(Infinity)).toBe(false)
})

it('should fail if value is not an integer', () => {
    expect(isErrorCode(1.5)).toBe(false)
})

it('should succeed if value is a finite number', () => {
    expect(isErrorCode(-32603)).toBe(true)
})
