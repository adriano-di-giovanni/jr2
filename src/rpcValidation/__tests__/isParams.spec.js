import isParams from '../isParams'

it('should be a function', () => {
    expect(typeof isParams).toBe('function')
})

it('should fail if value is missing', () => {
    expect(isParams()).toBe(false)
})

it('should fail if value is not an array or an object', () => {
    expect(isParams(1)).toBe(false)
})

it('should succeed if value is an array', () => {
    expect(isParams([])).toBe(true)
})

it('should succeed if value is an object', () => {
    expect(isParams({})).toBe(true)
})
