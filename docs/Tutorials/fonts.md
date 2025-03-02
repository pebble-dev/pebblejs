---
layout: default
---

## Fonts

You can use any of the Pebble system fonts in your Pebble.js applications. Please refer to [this guide to](https://developer.rebble.io/developer.pebble.com/guides/app-resources/system-fonts/index.html) for a list of all the Pebble system fonts. When referring to a font, using lowercase with dashes is recommended. For example, `GOTHIC_18_BOLD` becomes `gothic-18-bold`.

```js
var Vector2 = require("vector2");

var wind = new UI.Window();
var textfield = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  font: "gothic-18-bold",
  text: "Gothic 18 Bold",
});
wind.add(textfield);
wind.show();
```

<breadcrumb>
