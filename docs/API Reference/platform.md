---
layout: default
---

## Platform

[Platform]: #platform

`Platform` provides a module of the same name `Platform` and a feature detection module [Feature].

### Platform

The Platform module allows you to determine the current platform runtime on the watch through its `Platform.version` method. This is to be used when the [Feature] module does not give enough ability to discern whether a feature exists or not.

```js
var Platform = require("platform");
```

<a id="platform-version"></a>

#### Platform.version()

[Platform.version()]: #platform-version

`Platform.version` returns the current platform version name as a lowercase string. This can be `'aplite'`, `'basalt'`, or `'chalk'`. Use the following table to determine the platform that `Platform.version` will return.

| Watch Model          |  Platform  |
| -------------------- | :--------: |
| Pebble Classic       | `'aplite'` |
| Pebble Steel Classic | `'aplite'` |
| Pebble Time          | `'basalt'` |
| Pebble Time Steel    | `'basalt'` |
| Pebble Time Round    | `'chalk'`  |

```js
console.log("Current platform is " + Platform.version());
```
