import isId from '../isId'

it('should be a function', () => {
    expect(typeof isId).toBe('function')
})

it('should fail if value is undefined', () => {
    expect(isId()).toBe(false)
})

it('should fail if value is invalid', () => {
    expect(isId(true)).toBe(false)
})

it('should fail if value is null', () => {
    expect(isId(null)).toBe(true)
})

it('should fail if value is NaN', () => {
    expect(isId(NaN)).toBe(false)
})

it('should fail if value is not finite', () => {
    expect(isId(-Infinity)).toBe(false)
    expect(isId(Infinity)).toBe(false)
})

it('should succeed if value is a number', () => {
    expect(isId(0)).toBe(true)
})

it('should succeed if value is a string', () => {
    expect(isId('a')).toBe(true)
})
