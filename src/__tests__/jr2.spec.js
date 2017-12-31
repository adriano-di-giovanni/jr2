import { createClient, createServer } from '../'
import Client from '../Client/index'
import Server from '../Server/index'

describe('createClient', () => {
    it('should be a function', () => {
        expect(typeof createClient).toBe('function')
    })

    it('should return a client instance', () => {
        expect(createClient() instanceof Client).toBe(true)
    })
})

describe('createServer', () => {
    it('should be a function', () => {
        expect(typeof createServer).toBe('function')
    })

    it('should return a server instance', () => {
        expect(createServer({}) instanceof Server).toBe(true)
    })
})
