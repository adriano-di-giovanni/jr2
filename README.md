# jr2

jr2 is an extremely lightweight [JSON-RPC 2.0](http://www.jsonrpc.org/specification) compliant client and server for Javascript.

It is transport-independent, runs in client and server environments, has no dependencies.

It is tiny (< 2kB).

## Installation

```bash
npm install --save jr2
```

You can use jr2 with module bundlers.

The `jr2` npm package also includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the `dist` folder. They can be used without a bundler.

The UMD builds make jr2 available as `window.jr2` global variable.

jr2 works in [any modern browser](http://caniuse.com/#feat=es5) and Node.js.

## Usage

### Client

```Javascript
import { Client } from 'jr2'

const client = new Client()

const request = client.request('sum', [23, 42], 1)

console.log(request) // { jsonrpc: '2.0', method: 'sum', params: [23, 42], id: 1 }
```

### Server

```javascript
import { Server } from 'jr2'

const delegate = {
    sum(params, { responseWithResult }, callback) {
        const result = params.reduce((a, b) => a + b, 0)
        callback(null, responseWithResult(result))
    },
}

const server = new Server(delegate)

const request = {
    jsonrpc: '2.0',
    method: 'sum',
    params: [23, 42],
    id: 1,
}

server.handle(request, (err, response) => {
    console.log(response) // { jsonrpc: '2.0', result: -19, id: 1 }
})
```

#### Delegate

The delegate implements server methods as functions. Functions are invoked with
`(params, context, callback)` and `this` is bound to the delegate.

The `params` argument can be an array of positional parameters or an object for named parameters.

The `context` argument is an object implementing two helper functions: `responseWithResult(result)` and `responseWithError(code, message, data)`. These helper functions help you create a compliant response and automatically match the id of the response with the id of the related request.

The `callback` argument is a function. It is expected to be invoked with `(err, response)`.

## License

MIT
