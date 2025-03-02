---
layout: default
---

## Settings

[Settings]: #settings

The Settings module allows you to add a configurable web view to your application and share options with it. Settings also provides two data accessors `Settings.option` and `Settings.data` which are backed by localStorage. Data stored in `Settings.option` is automatically shared with the configurable web view.

### Settings

`Settings` provides a single module of the same name `Settings`.

```js
var Settings = require("settings");
```

<a id="settings-config"></a>

#### Settings.config(options, [open,] close)

[Settings.config()]: #settings-config

`Settings.config` registers your configurable for use along with `open` and `close` handlers.

`options` is an object with the following parameters:

| Name       |  Type   |  Argument  | Default | Description                                                                                                    |
| ---------- | :-----: | :--------: | ------- | -------------------------------------------------------------------------------------------------------------- |
| `url`      | string  |            |         | The URL to the configurable. e.g. 'http://www.example.com?name=value'                                          |
| `autoSave` | boolean | (optional) | true    | Whether to automatically save the web view response to options                                                 |
| `hash`     | boolean | (optional) | true    | Whether to automatically concatenate the URI encoded json `Settings` options to the URL as the hash component. |

`open` is an optional callback used to perform any tasks before the webview is open, such as managing the options that will be passed to the web view.

```js
// Set a configurable with the open callback
Settings.config(
  { url: "http://www.example.com" },
  function (e) {
    console.log("opening configurable");

    // Reset color to red before opening the webview
    Settings.option("color", "red");
  },
  function (e) {
    console.log("closed configurable");
  }
);
```

`close` is a callback that is called when the webview is closed via `pebblejs://close`. Any arguments passed to `pebblejs://close` is parsed and passed as options to the handler. `Settings` will attempt to parse the response first as URI encoded json and second as form encoded data if the first fails.

```js
// Set a configurable with just the close callback
Settings.config({ url: "http://www.example.com" }, function (e) {
  console.log("closed configurable");

  // Show the parsed response
  console.log(JSON.stringify(e.options));

  // Show the raw response if parsing failed
  if (e.failed) {
    console.log(e.response);
  }
});
```

To pass options from your configurable to `Settings.config` `close` in your webview, URI encode your options json as the hash to `pebblejs://close`. This will close your configurable, so you would perform this action in response to the user submitting their changes.

```js
var options = { color: "white", border: true };
document.location =
  "pebblejs://close#" + encodeURIComponent(JSON.stringify(options));
```

#### Settings.option

`Settings.option` is a data accessor built on localStorage that shares the options with the configurable web view.

#### Settings.option(field, value)

Saves `value` to `field`. It is recommended that `value` be either a primitive or an object whose data is retained after going through `JSON.stringify` and `JSON.parse`.

```js
Settings.option("color", "red");
```

If `value` is undefined or null, the field will be deleted.

```js
Settings.option("color", null);
```

#### Settings.option(field)

Returns the value of the option in `field`.

```js
var player = Settings.option("player");
console.log(player.id);
```

#### Settings.option(options)

Sets multiple options given an `options` object.

```js
Settings.option({
  color: "blue",
  border: false,
});
```

#### Settings.option()

Returns all options. The returned options can be modified, but if you want the modifications to be saved, you must call `Settings.option` as a setter.

```js
var options = Settings.option();
console.log(JSON.stringify(options));

options.counter = (options.counter || 0) + 1;

// Modifications are not saved until `Settings.option` is called as a setter
Settings.option(options);
```

#### Settings.data

`Settings.data` is a data accessor similar to `Settings.option` except it saves your data in a separate space. This is provided as a way to save data or options that you don't want to pass to a configurable web view.

While localStorage is still accessible, it is recommended to use `Settings.data`.

#### Settings.data(field, value)

Saves `value` to `field`. It is recommended that `value` be either a primitive or an object whose data is retained after going through `JSON.stringify` and `JSON.parse`.

```js
Settings.data("player", { id: 1, x: 10, y: 10 });
```

If `value` is undefined or null, the field will be deleted.

```js
Settings.data("player", null);
```

#### Settings.data(field)

Returns the value of the data in `field`.

```js
var player = Settings.data("player");
console.log(player.id);
```

#### Settings.data(data)

Sets multiple data given an `data` object.

```js
Settings.data({
  name: "Pebble",
  player: { id: 1, x: 0, y: 0 },
});
```

#### Settings.data()

Returns all data. The returned data can be modified, but if you want the modifications to be saved, you must call `Settings.data` as a setter.

```js
var data = Settings.data();
console.log(JSON.stringify(data));

data.counter = (data.counter || 0) + 1;

// Modifications are not saved until `Settings.data` is called as a setter
Settings.data(data);
```

## UI

[UI]: #ui

The UI framework contains all the classes needed to build the user interface of your Pebble applications and interact with the user.
