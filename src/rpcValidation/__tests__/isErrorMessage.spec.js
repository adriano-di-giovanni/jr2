import isErrorMessage from '../isErrorMessage'

it('should be a function', () => {
    expect(typeof isErrorMessage).toBe('function')
})

it('should fail if value is not a string', () => {
    expect(isErrorMessage(1)).toBe(false)
})

it('should succeed if value is a string', () => {
    expect(isErrorMessage('')).toBe(true)
})
