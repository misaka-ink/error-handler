# error-handler 
[![Build Status](https://travis-ci.org/misaka-ink/error-handler.svg?branch=master)](https://travis-ci.org/misaka-ink/error-handler)

Handling server error message when status code is `2xx`

looks like...

```javascript

// response status code is 2xx
// error message in response

const result = {
    code: 'xxxxxxx',
    msg: 'error message',
    data: {} // error data
}

```

## Examples

```javascript
import fetch2 from '@misaka.ink/fetch2'
import errorhandler from '@misaka.ink/error-handler'

// fetch2
const f2 = fetch2.getInstance()

// error mapping
// status: response status code
// body: response data
const errorMapping = {
    status: {
    },
    body: {
        100001: 'error message'        
    }
}

// error data
/*
    {
        code: 100001,
        msg: 'db error'
    }
 */

// use middleware
f2.use(
    errorhandler({
        // error code or message path of `body`
        errorPath: 'code', 
        
        // error mapping
        map: errorMapping,
        
        // error filed - response['errorMsg']
        errorField: 'errorMsg'
        
    })
)

// Todo -> request
// f2.request('/example') -> response is {code: 100001} -> middleware: error-handler 'error message'
```
