---
layout: default
---

### Feature

[Feature]: #feature

The Feature module under Platform allows you to perform feature detection, adjusting aspects of your application to the capabilities of the current watch model it is current running on. This allows you to consider the functionality of your application based on the current set of available capabilities or features. The Feature module also provides information about features that exist on all watch models such as `Feature.resolution` which returns the resolution of the current watch model.

```js
var Feature = require("platform/feature");

console.log("Color is " + Feature.color("avaiable", "not available"));
console.log("Display width is " + Feature.resolution().x);
```

<a id="feature-color"></a>

#### Feature.color([yes, no])

[Feature.color()]: #feature-color

`Feature.color` will return the `yes` parameter if color is supported and `no` if it is not. This is the opposite of [Feature.blackAndWhite()]. When given no parameters, it will return true or false respectively.

```js
var textColor = Feature.color("oxford-blue", "black");

if (Feature.color()) {
  // Perform color-only operation
  console.log("Color supported");
}
```

<a id="feature-blackAndWhite"></a>

#### Feature.blackAndWhite([yes, no])

[Feature.blackAndWhite()]: #feature-blackAndWhite

`Feature.blackAndWhite` will return the `yes` parameter if only black and white is supported and `no` if it is not. This is the opposite of [Feature.color()]. When given no parameters, it will return true or false respectively.

```js
var backgroundColor = Feature.blackAndWhite("white", "clear");

if (Feature.blackAndWhite()) {
  // Perform black-and-white-only operation
  console.log("Black and white only");
}
```

<a id="feature-rectangle"></a>

#### Feature.rectangle([yes, no])

[Feature.rectangle()]: #feature-rectangle

<a id="feature-round"></a>

#### Feature.round([yes, no])

[Feature.round()]: #feature-round

`Feature.round` will return the `yes` parameter if the watch screen is round and `no` if it is not. This is the opposite of [Feature.rectangle()], which functions in the same way. When given no parameters, it will return true or false respectively.

```js
var textAlign = Feature.round("center", "left");

if (Feature.round()) {
  // Perform round display only operation
  console.log("Round display");
}
```

#### Feature.microphone([yes, no])

`Feature.microphone` will return the `yes` parameter if the watch has a microphone and `no` if it does not. When given no parameters, it will return true or false respectively. Useful for determining whether the `Voice` module will allow transcription or not and changing the UI accordingly.

```js
var text = Feature.microphone("Say your command.", "Select your command.");

if (Feature.microphone()) {
  // Perform microphone only operation
  console.log("Microphone available");
}
```

<a id="feature-resolution"></a>

#### Feature.resolution()

[Feature.resolution()]: #feature-resolution

`Feature.resolution` returns a [Vector2] containing the display width as the `x` component and the display height as the `y` component. Use the following table to determine the resolution that `Feature.resolution` will return on a given platform.

| Platform | Width | Height | Note                                                                                              |
| -------- | :---: | :----: | ------------------------------------------------------------------------------------------------- |
| aplite   |  144  |  168   |                                                                                                   |
| basalt   |  144  |  168   | This is a rounded rectangle, therefore there is small set of pixels at each corner not available. |
| chalk    |  180  |  180   | This is a circular display, therefore not all pixels in a 180 by 180 square are available.        |

**NOTE:** [Window]s also have a [Window.size()] method which returns its size as a [Vector2]. Use [Window.size()] when possible.

```js
var res = Feature.resolution();
console.log("Current display is " + res.x + "x" + res.y);
```

#### Feature.actionBarWidth()

`Feature.actionBarWidth` returns the action bar width based on the platform. This is `30` for rectangular displays and `40` for round displays. Useful for determining the remaining screen real estate in a dynamic [Window] with an action bar visible.

```js
var rightMargin = Feature.actionBarWidth() + 5;
var elementWidth = Feature.resolution().x - rightMargin;
```

**NOTE:** [Window.size()] already takes the action bar into consideration, so use it instead when possible.

<a id="feature-statusBarHeight"></a>

#### Feature.statusBarHeight()

[Feature.statusBarHeight()]: #feature-statusBarHeight

`Feature.statusBarHeight` returns the status bar height. This is `16` and can change accordingly if the Pebble Firmware theme ever changes. Useful for determining the remaining screen real estate in a dynamic [Window] with a status bar visible.

```js
var topMargin = Feature.statusBarHeight() + 5;
var elementHeight = Feature.resolution().y - topMargin;
```

**NOTE:** [Window.size()] already takes the status bar into consideration, so use it instead when possible.
