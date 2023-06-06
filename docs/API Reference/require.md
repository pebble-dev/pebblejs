---
layout: default
---

### require(path)

Loads another JavaScript file allowing you to write a multi-file project. Package loading loosely follows the CommonJS format. `path` is the path to the dependency.

```js
// src/js/dependency.js
var dep = require("dependency");
```

Exporting is possible by modifying or setting `module.exports` within the required file. The module path is also available as `module.filename`. `require` will look for the module relative to the loading module, the root path, and the Pebble.js library folder `lib` located at `src/js/lib`.
