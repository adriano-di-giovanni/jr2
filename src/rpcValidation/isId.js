export default value => {
    const type = typeof value
    return (
        value === null ||
        (type === 'number' && !isNaN(value) && value !== -Infinity && value !== Infinity) ||
        type === 'string'
    )
}
