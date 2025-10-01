app.get(path, callback [, callback ...])

Routes HTTP GET requests to the specified path with the specified callback functions.
 	The path for which the middleware function is invoked. It can be any of the following:
path
    A string representing a path.
    A path pattern.
    A regular expression pattern to match paths.
    An array containing any combination of the abov

callback 
	One or more callback functions. Accepted formats:

    A single middleware function.
    Multiple middleware functions separated by commas.
    An array of middleware functions.
    A combination of the above.


app.listen(path, [callback])

Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().

const express = require('express')
const app = express()
app.listen('/tmp/sock')



app.METHOD(path, callback [, callback ...])

Routes an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, and so on, in lowercase. Thus, the actual methods are app.get(), app.post(), app.put(), and so on. See Routing methods below for the complete list.

Routing methods

Express supports the following routing methods corresponding to the HTTP methods of the same names:

    checkout
    copy
    delete
    get
    head
    lock
    merge
    mkactivity

    mkcol
    move
    m-search
    notify
    options
    patch
    post

    purge
    put
    report
    search
    subscribe
    trace
    unlock
    unsubscribe


    res.status(418).send

    