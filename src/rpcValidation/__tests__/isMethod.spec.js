import isMethod from '../isMethod'

it('should be a function', () => {
    expect(typeof isMethod).toBe('function')
})

it('should fail if value is missing', () => {
    expect(isMethod()).toBe(false)
})

it('should fail if value is not a string', () => {
    expect(isMethod(1)).toBe(false)
})

it('should succeed if value is an empty string', () => {
    expect(isMethod('')).toBe(true)
})

it('should succeed if value is a string', () => {
    expect(isMethod('noop')).toBe(true)
})
