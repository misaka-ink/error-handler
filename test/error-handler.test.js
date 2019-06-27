/**
 * @file (error-handler.test)
 * Created by Xinyi on 2019-05-07.
 */

import Koa from 'koa'
import errorhandler from '../lib/index'
import fetch2 from '@misaka.ink/fetch2'

const mapKV = {
    status: {
        204: 'it\' ok'
    },
    body: {
        100001: 'error message'
    }
}

// fetch2
const f2 = fetch2.getInstance()

f2.use(errorhandler({
    errorPath: 'code',
    map: mapKV
}))

// mock server
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
})

app.use(async ctx => {
    if (ctx.url === '/body') {
        ctx.body = {
            code: 100001
        }
    }
    else if (ctx.url === '/status') {
        ctx.status = 204
    }
    else if (ctx.url === '/succ') {
        ctx.status = 200
        ctx.body = "success"
    }
})

let server

// start
beforeAll(async done => {
    server = await app.listen(3000)
    done()
})

// close
afterAll(async done => {
    await server.close()
    done()
})

describe('use fetch2 error-handler middleware', function () {
    test('should return normal result', async () => {
        const result = await f2.request('http://localhost:3000/succ')
        return expect(result).toEqual('success')
    })

    test('should return mapping error message of `body` when processing error', async () => {
        const result = await f2.request('http://localhost:3000/body')
        return expect(result).toEqual(mapKV.body['100001'])
    })

    test('should return mapping error message of `status code` when processing error', async () => {
        const result = await f2.request('http://localhost:3000/status')
        return expect(result).toEqual(mapKV.status['204'])
    })

    test('')

    test('should return mapping error message in target field', async () => {
        const f2 = new fetch2()
        f2.use(errorhandler({
            errorPath: 'code',
            map: mapKV,
            errorField: 'errorMsg'
        }))
        const result = await f2.request('http://localhost:3000/body')
        return expect(result['errorMsg']).toEqual(mapKV.body['100001'])
    })
})
