export default (array, iteratee, callback) => {
    let count = array.length
    const results = []
    array.forEach((element, index) => {
        iteratee(element, (err, result) => {
            if (err) {
                callback(err)
                return
            }
            results[index] = result
            count--
            if (count === 0) {
                callback(null, results)
            }
        })
    })
}
