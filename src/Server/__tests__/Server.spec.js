import map from 'async/map'
import Server from '../'

it('should handle rpc calls with positional parameters', done => {
    const delegate = {
        subtract: (params, { responseWithResult }, callback) =>
            callback(null, responseWithResult(params[0] - params[1])),
    }
    const server = new Server(delegate)

    const requests = [
        {
            jsonrpc: '2.0',
            method: 'subtract',
            params: [42, 23],
            id: 1,
        },
        {
            jsonrpc: '2.0',
            method: 'subtract',
            params: [23, 42],
            id: 2,
        },
    ]

    map(requests, server.handle.bind(server), (err, responses) => {
        if (err) {
            done(err)
            return
        }

        const results = [19, -19]
        responses.forEach((response, index) => {
            expect(response).toBeDefined()
            expect(response.jsonrpc).toEqual('2.0')
            expect(response.result).toEqual(results[index])
            expect(response.id).toEqual(requests[index].id)
        })

        done()
    })
})

it('should handle rpc calls with named parameters', done => {
    const delegate = {
        subtract: ({ subtrahend, minuend }, { responseWithResult }, callback) =>
            callback(null, responseWithResult(subtrahend - minuend)),
    }
    const server = new Server(delegate)

    const requests = [
        {
            jsonrpc: '2.0',
            method: 'subtract',
            params: {
                subtrahend: 42,
                minuend: 23,
            },
            id: 1,
        },
        {
            jsonrpc: '2.0',
            method: 'subtract',
            params: {
                minuend: 23,
                subtrahend: 42,
            },
            id: 2,
        },
    ]

    map(requests, server.handle.bind(server), (err, responses) => {
        if (err) {
            done(err)
            return
        }

        responses.forEach((response, index) => {
            expect(response).toBeDefined()
            expect(response.jsonrpc).toEqual('2.0')
            expect(response.result).toEqual(19)
            expect(response.id).toEqual(requests[index].id)
        })

        done()
    })
})

it('should handle notifications', done => {
    const delegate = {
        update: (params, context, callback) => callback(),
        foobar: (params, context, callback) => callback(),
    }
    const server = new Server(delegate)

    const requests = [
        {
            jsonrpc: '2.0',
            method: 'update',
            params: [1, 2, 3, 4, 5],
        },
        {
            jsonrpc: '2.0',
            method: 'foobar',
        },
    ]

    map(requests, server.handle.bind(server), (err, responses) => {
        if (err) {
            done(err)
            return
        }

        expect(responses).toEqual([void 0, void 0])

        done()
    })
})

it('should handle rpc call of non-existent method', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'foobar',
        id: 1,
    }

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeDefined()
        expect(response.jsonrpc).toEqual('2.0')
        expect(response.error).toEqual({
            code: -32601,
            message: 'Method not found',
        })
        expect(response.id).toEqual(request.id)

        done()
    })
})

it('should handle rpc call with invalid JSON', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = '{"jsonrpc": "2.0", "method": "foobar, "params": "bar", "baz]'

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeDefined()
        expect(response.jsonrpc).toEqual('2.0')
        expect(response.error).toEqual({
            code: -32700,
            message: 'Parse error',
        })
        expect(response.id).toBeNull()

        done()
    })
})

it('should handle rpc call with invalid Request object', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 1,
        params: 'bar',
    }

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeDefined()
        expect(response.jsonrpc).toEqual('2.0')
        expect(response.error).toEqual({
            code: -32600,
            message: 'Invalid request',
        })
        expect(response.id).toBeNull()

        done()
    })
})

it('should handle rpc call Batch, invalid JSON', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request =
        '[ {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"}, {"jsonrpc": "2.0", "method" ]'

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeDefined()
        expect(response.jsonrpc).toEqual('2.0')
        expect(response.error).toEqual({
            code: -32700,
            message: 'Parse error',
        })
        expect(response.id).toBeNull()

        done()
    })
})

it('should handle rpc call with an empty Array', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = []

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeDefined()
        expect(response.jsonrpc).toEqual('2.0')
        expect(response.error).toEqual({
            code: -32600,
            message: 'Invalid request',
        })
        expect(response.id).toBeNull()

        done()
    })
})

it('should handle rpc call with invalid Batch (but not empty)', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = [1]

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(Array.isArray(response)).toBe(true)
        expect(response.length).toEqual(1)
        response.forEach(element => {
            expect(element.jsonrpc).toEqual('2.0')
            expect(element.error).toEqual({
                code: -32600,
                message: 'Invalid request',
            })
            expect(element.id).toBeNull()
        })

        done()
    })
})

it('should handle rpc call with invalid Batch', done => {
    const delegate = {}
    const server = new Server(delegate)

    const request = [1, 2, 3]

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(Array.isArray(response)).toBe(true)
        expect(response.length).toEqual(3)
        response.forEach(element => {
            expect(element.jsonrpc).toEqual('2.0')
            expect(element.error).toEqual({
                code: -32600,
                message: 'Invalid request',
            })
            expect(element.id).toBeNull()
        })

        done()
    })
})

it('should handle rpc call Batch', done => {
    const delegate = {
        sum: jest.fn((params, { responseWithResult }, callback) =>
            callback(null, responseWithResult(params.reduce((a, b) => a + b, 0)))
        ),
        notify_hello: jest.fn((params, context, callback) => callback()),
        subtract: jest.fn((params, { responseWithResult }, callback) =>
            callback(null, responseWithResult(params[0] - params[1]))
        ),
        get_data: jest.fn((params, { responseWithResult }, callback) =>
            callback(null, responseWithResult(['hello', 5]))
        ),
    }
    const server = new Server(delegate)

    const request = [
        {
            jsonrpc: '2.0',
            method: 'sum',
            params: [1, 2, 4],
            id: 1,
        },
        {
            jsonrpc: '2.0',
            method: 'notify_hello',
            params: [7],
        },
        {
            jsonrpc: '2.0',
            method: 'subtract',
            params: [42, 23],
            id: 2,
        },
        {
            foo: 'boo',
        },
        {
            jsonrpc: '2.0',
            method: 'foo.get',
            params: {
                name: 'myself',
            },
            id: 5,
        },
        {
            jsonrpc: '2.0',
            method: 'get_data',
            id: 9,
        },
    ]

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
        }

        expect(response).toEqual([
            {
                jsonrpc: '2.0',
                result: 7,
                id: 1,
            },
            {
                jsonrpc: '2.0',
                result: 19,
                id: 2,
            },
            {
                jsonrpc: '2.0',
                error: {
                    code: -32600,
                    message: 'Invalid request',
                },
                id: null,
            },
            {
                jsonrpc: '2.0',
                error: {
                    code: -32601,
                    message: 'Method not found',
                },
                id: 5,
            },
            {
                jsonrpc: '2.0',
                result: ['hello', 5],
                id: 9,
            },
        ])

        done()
    })
})

it('should handle rpc call Batch (all notifications)', done => {
    const delegate = {
        notify_sum: jest.fn((params, context, callback) => callback()),
        notify_hello: jest.fn((params, context, callback) => callback()),
    }
    const server = new Server(delegate)

    const request = [
        {
            jsonrpc: '2.0',
            method: 'notify_sum',
            params: [1, 2, 4],
        },
        {
            jsonrpc: '2.0',
            method: 'notify_hello',
            params: [7],
        },
    ]

    server.handle(request, (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toBeUndefined()

        done()
    })
})

it('should handle rpc call JSON', done => {
    const delegate = {
        noop(params, { responseWithResult }, callback) {
            callback(null, responseWithResult('OK'))
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'noop',
        id: 1,
    }

    server.handle(JSON.stringify(request), (err, response) => {
        if (err) {
            done(err)
            return
        }

        expect(response).toEqual({
            jsonrpc: '2.0',
            result: 'OK',
            id: 1,
        })

        done()
    })
})

it('should throw if request is a notification and a response is returned (responseWithResult)', () => {
    const delegate = {
        notify(params, { responseWithResult }, callback) {
            callback(null, responseWithResult('OK'))
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'notify',
    }

    expect(() => server.handle(request)).toThrow(/Unexpected call/)
})

it('should throw if request is a notification and a response is returned (responseWithError)', () => {
    const delegate = {
        notify(params, { responseWithError }, callback) {
            callback(null, responseWithError(1, 'message'))
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'notify',
    }

    expect(() => server.handle(request)).toThrow(/Unexpected call/)
})

it('should throw if request is a notification and a response is returned', () => {
    const delegate = {
        notify(params, context, callback) {
            const response = {
                jsonrpc: '2.0',
                result: 'OK',
            }
            callback(null, response)
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'notify',
    }

    expect(() => server.handle(request)).toThrow(/Invalid response/)
})

it('should throw if response is not returned', () => {
    const delegate = {
        method(params, context, callback) {
            callback()
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'method',
        id: 1,
    }

    expect(() => server.handle(request)).toThrow(/Missing or invalid response/)
})

it('should throw if delegate is missing', () => {
    expect(() => new Server()).toThrow(/Missing or invalid delegate/)
})

it('should throw if delegate is invalid', () => {
    expect(() => new Server(1)).toThrow(/Missing or invalid delegate/)
})

it('should throw if callback is invalid', () => {
    const delegate = {
        notify(params, context, callback) {
            callback()
        },
    }
    const server = new Server(delegate)

    const request = {
        jsonrpc: '2.0',
        method: 'notify',
    }

    expect(() => server.handle(request, 1)).toThrow(/Invalid callback/)
})
