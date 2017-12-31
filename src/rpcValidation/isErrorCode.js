export default value =>
    typeof value === 'number' &&
    !isNaN(value) &&
    value !== -Infinity &&
    value !== Infinity &&
    Math.floor(value) === value
