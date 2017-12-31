import Server from './Server/index'
import Client from './Client/index'

export function createClient() {
    return new Client()
}

export function createServer(delegate) {
    return new Server(delegate)
}
