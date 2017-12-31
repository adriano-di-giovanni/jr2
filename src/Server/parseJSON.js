export default (text, done) => {
    // wrap `done` callback to invoke it asynchronously
    // in order to avoid its code to be executed inside try/catch block
    const callback = wrapCallback(done)

    try {
        callback(null, JSON.parse(text))
    } catch (e) {
        callback(e)
    }
}

const wrapCallback = callback => (err, result) => {
    const fn = () => callback(err, result)
    if (setImmediate) {
        setImmediate(fn)
        return
    }
    setTimeout(fn, 0)
}
