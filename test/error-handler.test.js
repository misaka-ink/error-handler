/**
 * @file (error-handler.test)
 * Created by Xinyi on 2019-05-07.
 */

import Koa from 'koa'
import errorhandler from '../lib/index'
import fetch2 from '@misaka.ink/fetch2'

const mapKV = {
    100001: 'error message of 100001'
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
    ctx.body = {
        code: 100001
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
    test('should return mapping error message when processing error', async () => {
        try {
            const result = await f2.request('http://localhost:3000/test')
            return expect(result).toEqual(mapKV['100001'])
        } catch (e) {
            console.log(e)
            throw e
        }
    })
})
