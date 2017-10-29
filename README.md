# sync_button

This is a small **long poll** test using Express as the HTTP server and AngularJS for both requests and data binding. The mais page features a toggle button and a banner which displayes the `state` variable. When opened on multiple devices, a single button click on any device will update the server-side data and all clients as fast as possible.

It uses a smaller number of requests when compared to regular polls that return immediately. By keeping the connection alive, one can guarantee fast updates when data changes. However, long timeout values may also mask connection errors.

### What it does

A `GET` request with a large timeout value is made continuously to `/state`.
The `GET` request is answered either when the `state` variable changes (through button presses which trigger `POST` requests) or by a server-side timeout.



### How it works

Each time a `GET` request on `/state` is made, a function is bound to the `stateChanged` event, which is emitted every time the `state` variable changes through a `POST` request on `/state`.

The same function is scheduled through `setTimeout()` for execution with a given timeout.

The function checks a binary flag to prevent being executed multiple times, removes the listener for the `stateChanged` event and returns the `state` value through JSON.

The request is either finished by data change or by timeout.
