/**
 * @file (error-handler.test)
 * Created by Xinyi on 2019-05-07.
 */

import Koa from 'koa'
import errorhandler from '../lib/index'
import fetch2 from '@misaka.ink/fetch2'

const mapKV = {
    10001: 'error'
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
        code: 10001
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

describe('use fetch2 doT-template middleware', function () {
    test('should return html code of the user template with username', async () => {
        try {
            const result = await f2.request('http://localhost:3000/test')
            console.log(result)
            // return expect(result).toEqual('<h1>Hello Mine, here is user template</h1>')
        } catch (e) {
            console.log('草')
            throw e
        }
    })
})
