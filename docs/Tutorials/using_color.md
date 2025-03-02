---
layout: default
---

## Using Color

You can use color in your Pebble.js applications by specifying them in the supported [Color Formats]. Use the [Pebble Color Picker](https://developer.rebble.io/developer.pebble.com/guides/tools-and-resources/color-picker/index.html) to find colors to use. Be sure to maintain [Readability and Contrast] when developing your application.

### Color Formats

[Color Formats]: #color-formats

Color can be specified in various ways in your Pebble.js application. The formats are named string, hexadecimal string, and hexadecimal number. Each format has different benefits.

The following table includes examples of all the supported formats in Pebble.js:

| Color Format                    |          Examples          |
| ------------------------------- | :------------------------: |
| Named String                    | `'green', 'sunset-orange'` |
| Hexadecimal String              |   `'#00ff00', '#ff5555'`   |
| Hexadecimal String (with alpha) | `'#ff00ff00', '#ffff5555'` |
| Hexadecimal Number              |    `0x00ff00, 0xff5555`    |
| Hexadecimal Number (with alpha) |  `0xff00ff00, 0xffff5555`  |

**Named strings** are convenient to remember and read more naturally. They however cannot have the alpha channel be specified with the exception of the named string color `'clear'`. All other named colors are at max opacity. Named colors can also be specified in multiple casing styles, such as hyphenated lowercase `'sunset-orange'`, C constant `'SUNSET_ORANGE'`, Pascal `'SunsetOrange'`, or camel case `'sunsetOrange'`. Use the casing most convenient for you, but do so consistently across your own codebase.

**Hexadecimal strings** can be used for specifying the exact color desired as Pebble.js will automatically round the color to the supported color of the current platform. Two hexadecimal digits are used to represent the three color channels red, green, blue in that order.

**Hexadecimal strings (with alpha)** specified with eight digits are parsed as having an alpha channel specified in the first two digits where `00` is clear and `ff` is full opacity.

**Hexadecimal numbers** can be manipulated directly with the arithmetic and bitwise operators. This is also the format which the configurable framework Clay uses.

**Hexadecimal numbers (with alpha)** also have an alpha channel specified, but it is recommended to use hexadecimal strings instead for two reasons. The first reason is that `00` also represents full opacity since they are equivalent to six digit hexadecimal numbers which are implicitly at full opacity. The second is that when explicitly representing full opacity as `ff`, some integer logic can cause a signed overflow, resulting in negative color values. Intermediate alpha channels such as `55` or `aa` have no such caveats.

Various parts of the Pebble.js API support color. Parameters of the type Color can take any of the color formats mentioned in the above table.

```js
var UI = require("ui");

var card = new UI.Card({
  title: "Using Color",
  titleColor: "sunset-orange", // Named string
  subtitle: "Color",
  subtitleColor: "#00dd00", // 6-digit Hexadecimal string
  body: "Format",
  bodyColor: 0x9a0036, // 6-digit Hexadecimal number
});

card.show();
```

### Readability and Contrast

[Readability and Contrast]: #readability-and-contrast

When using color or not, be mindful that your users may not have a Pebble supporting color or the reverse. Black and white Pebbles will display colors with medium luminance as a gray checkered pattern which makes text of any color difficult to read. In Pebble.js, you can use [Feature.color()] to use a different value depending on whether color is supported.

```js
var UI = require("ui");
var Feature = require("platform/feature");

var card = new UI.Card({
  title: "Using Color",
  titleColor: Feature.color("sunset-orange", "black"),
  subtitle: "Readability",
  subtitleColor: Feature.color("#00dd00", "black"),
  body: "Contrast",
  bodyColor: Feature.color(0x9a0036, "black"),
  backgroundColor: Feature.color("light-gray", "white"),
});

card.show();
```

Whether you have a color Pebble or not, you will want to test your app in all platforms. You can see how your app looks in multiple platforms with the following local SDK command.

> `pebble build && pebble install --emulator=aplite && pebble install --emulator=basalt && pebble install --emulator=chalk`

Using too much color such as in the previous example can be overwhelming however. Just using one color that stands out in a single place can have a more defined effect and remain readable.

```js
var card = new UI.Card({
  status: {
    color: "white",
    backgroundColor: Feature.color("electric-ultramarine", "black"),
    separator: "none",
  },
  title: "Using Color",
  subtitle: "Readability",
  body: "Contrast",
});
```

Likewise, if introducing an action bar, you can remove all color from the status bar and instead apply color to the action bar.

```js
var card = new UI.Card({
  status: true,
  action: {
    backgroundColor: Feature.color("jazzberry-jam", "black"),
  },
  title: "Dialog",
  subtitle: "Action",
  body: "Button",
});
```

When changing the background color, note that the status bar also needs its background color changed too if you would like it to match.

```js
var backgroundColor = Feature.color("light-gray", "black");
var card = new UI.Card({
  status: {
    backgroundColor: backgroundColor,
    separator: Feature.round("none", "dotted"),
  },
  action: {
    backgroundColor: "black",
  },
  title: "Music",
  titleColor: Feature.color("orange", "black"),
  subtitle: "Playing",
  body: "Current Track",
  backgroundColor: backgroundColor,
});
```

For a menu, following this style of coloring, you would only set the `highlightBackgroundColor`.

```js
var menu = new UI.Menu({
  status: {
    separator: Feature.round("none", "dotted"),
  },
  highlightBackgroundColor: Feature.color("vivid-violet", "black"),
  sections: [
    {
      items: [
        { title: "One", subtitle: "Using Color" },
        { title: "Color", subtitle: "Color Formats" },
        { title: "Hightlight", subtitle: "Readability" },
      ],
    },
  ],
});

menu.show();
```

In the examples above, mostly black text on white or light gray is used which has the most contrast. Try to maintain this amount of contrast with text. Using dark gray on light gray for example can be unreadable at certain angles in the sunlight or in darkly lit areas.

<breadcrumb>
