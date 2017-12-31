import Client from '../'

let client

beforeAll(() => {
    client = new Client()
})

describe('request', () => {
    it("should throw if 'method' is missing", () => {
        expect(() => {
            client.request()
        }).toThrow(/Missing or invalid 'method'/)
    })

    it("should throw if 'method' is invalid", () => {
        expect(() => {
            client.request(1)
        }).toThrow(/Missing or invalid 'method'/)
    })

    it('should create a notification', () => {
        expect(client.request('notify')).toEqual({
            jsonrpc: '2.0',
            method: 'notify',
        })
    })

    it("should throw if 'params' is invalid", () => {
        expect(() => {
            client.request('notify', 1)
        }).toThrow(/Invalid 'params'/)
    })

    it("should throw if 'id' is invalid", () => {
        expect(() => {
            client.request('noop', null, true)
        }).toThrow(/Invalid 'id'/)
    })

    it('should create a request with positional parameters', () => {
        expect(client.request('sum', [1, 2, 4], 1)).toEqual({
            jsonrpc: '2.0',
            method: 'sum',
            params: [1, 2, 4],
            id: 1,
        })
    })

    it('should create a request with named parameters', () => {
        expect(client.request('subtract', { subtrahend: 23, minuend: 42 }, 1)).toEqual({
            jsonrpc: '2.0',
            method: 'subtract',
            params: {
                subtrahend: 23,
                minuend: 42,
            },
            id: 1,
        })
    })
})
