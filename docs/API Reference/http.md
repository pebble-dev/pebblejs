---
layout: default
---

### ajax

[ajax]: #ajax

This module gives you a very simple and easy way to make HTTP requests. This is recommended over XMLHttpRequest.

```js
var ajax = require("ajax");

ajax(
  { url: "http://api.theysaidso.com/qod.json", type: "json" },
  function (data) {
    console.log("Quote of the day is: " + data.contents.quotes[0].quote);
  }
);
```

#### ajax(options, success, failure)

The supported options are:

| Name      |  Type   |  Argument  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | :-----: | :--------: | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | string  |            |         | The URL to make the ajax request to. e.g. 'http://www.example.com?name=value'                                                                                                                                                                                                                                                                                                                                                                 |
| `method`  | string  | (optional) | get     | The HTTP method to use: 'get', 'post', 'put', 'delete', 'options', or any other standard method supported by the running environment.                                                                                                                                                                                                                                                                                                         |
| `type`    | string  | (optional) |         | The content and response format. By default, the content format is 'form' and response format is separately 'text'. Specifying 'json' will have ajax send `data` as json as well as parse the response as json. Specifying 'text' allows you to send custom formatted content and parse the raw response text. If you wish to send form encoded data and parse json, leave `type` undefined and use `JSON.decode` to parse the response data. |
| `data`    | object  | (optional) |         | The request body, mainly to be used in combination with 'post' or 'put'. e.g. `{ username: 'guest' }`                                                                                                                                                                                                                                                                                                                                         |
| `headers` | object  | (optional) |         | Custom HTTP headers. Specify additional headers. e.g. `{ 'x-extra': 'Extra Header' }`                                                                                                                                                                                                                                                                                                                                                         |
| `async`   | boolean | (optional) | true    | Whether the request will be asynchronous. Specify `false` for a blocking, synchronous request.                                                                                                                                                                                                                                                                                                                                                |
| `cache`   | boolean | (optional) | true    | Whether the result may be cached. Specify `false` to use the internal cache buster which appends the URL with the query parameter `_set` to the current time in milliseconds.                                                                                                                                                                                                                                                                 |

The `success` callback will be called if the HTTP request is successful (when the status code is inside [200, 300) or 304). The parameters are the data received from the server, the status code, and the request object. If the option `type: 'json'` was set, the response will automatically be converted to an object, otherwise `data` is a string.

The `failure` callback is called when an error occurred. The parameters are the same as `success`.

### XMLHttpRequest

`XMLHttpRequest` is [available for your use](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), but consider using the [ajax] module instead which provides a jQuery-like ajax alternative to performing asynchronous and synchronous HTTP requests, with built in support for forms and headers.
