import isVersion from '../isVersion'

it('should fail if value is missing', () => {
    expect(isVersion()).toBe(false)
})

it('should fail if value is not a string', () => {
    expect(isVersion(2.0)).toBe(false)
})

it("should fail if value is a string but it's not 2.0", () => {
    expect(isVersion('1.0')).toBe(false)
})

it("should succeed if value is '2.0'", () => {
    expect(isVersion('2.0')).toBe(true)
})
