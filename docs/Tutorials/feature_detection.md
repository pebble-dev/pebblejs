---
layout: default
---

## Feature Detection

Pebble.js provides the [Feature] module so that you may perform feature detection. This allows you to change the presentation or behavior of your application based on the capabilities or characteristics of the current Pebble watch that the user is running your application with.

### Using Feature

[Using Feature]: #using-feature

Pebble watches have 5 different platforms: Aplite, Basalt, Chalk, Diorite, and Emery.
Here's a quick summary of the platforms:
| Platform | Aplite | Basalt | Chalk | Diorite | |
|-----------------------------|------------------------|------------------------|------------------------|-----------------------------|---|
| Watches | Classic, Steel | Time, Time Steel | Time Round | Pebble 2 | |
| Max resource size | 96k | 256k | 256k | 256k | |
| Max. app size (code + heap) | 24k | 64k | 64k | 64k | |
| Display Shape | Rectangle | Rectangle | Round | Rectangle | |
| Resolution | 144 x 168 | 144 x 168 | 180 x 180 Round | 144 x 168 | |
| Heart Rate | No | No | No | Yes (P2+HR) | |
| Supported colors | 2 | 64 | 64 | 2 | |
| Microphone | No | Yes | Yes | Yes | |
| Sensors | Accelerometer, Compass | Accelerometer, Compass | Accelerometer, Compass | Accelerometer | |
| Charger | Classic (Power only) | Smart Accessory | Smart Accessory | Smart Accessory (data only) | |

You can find the full chart [here](https://developer.rebble.io/developer.pebble.com/guides/tools-and-resources/hardware-information/index.html).

You'll notice that there are a few differing capabilities across platforms, such as having color support or having a round screen. You can use [Feature.color()] and [Feature.round()] respectively in order to test for these capabilities. Most capability functions also have a direct opposite, such as [Feature.blackAndWhite()] and [Feature.rectangle()] respectively.

The most common way to use [Feature] capability functions is to pass two parameters.

```js
var UI = require("ui");
var Feature = require("platform/feature");

// Use 'red' if round, otherwise use 'blue'
var color = Feature.round("red", "blue");

var card = new UI.Card({
  title: "Color",
  titleColor: color,
});

card.show();
```

You can also call the [Feature] capability functions with no arguments. In these cases, the function will return either `true` or `false` based on whether the capability exists.

```js
if (Feature.round()) {
  // Perform round-only logic
  console.log("This is a round device.");
}
```

Among all Pebble platforms, there are characteristics that exist on all platforms, such as the device resolution and the height of the status bar. [Feature] also provides methods which gives additional information about these characteristics, such as [Feature.resolution()] and [Feature.statusBarHeight()].

```js
var res = Feature.resolution();
console.log("Current display height is " + res.y);
```

Check out the [Feature] API Reference for all the capabilities it detects and characteristics it offers.

### Feature vs Platform

[Feature vs Platform]: #feature-vs-platform

Pebble.js offers both [Feature] detection and [Platform] detection which are different. When do you use [Feature] detection instead of just changing the logic based on the current [Platform]? Using feature detection allows you to minimize the concerns of your logic, allowing each section of logic to be a single unit that does not rely on anything else unrelated.

Consider the following [Platform] detection logic:

```js
var UI = require("ui");
var Platform = require("platform");

var isAplite = Platform.version() === "aplite";
var isChalk = Platform.version() === "chalk";
var card = new UI.Card({
  title: "Example",
  titleColor: isAplite ? "black" : "dark-green",
  subtitle: isChalk ? "Hello World!" : "Hello!",
  body: isAplite ? "Press up or down" : "Speak to me",
});

card.show();
```

The first issue has to do with future proofing. It is checking if the current Pebble has a round screen by seeing if it is on Chalk, however there may be future platforms that have round screens. It can instead use [Feature.round()] which will update to include newer platforms as they are introduced.

The second issue is unintentional entanglement of different concerns. In the example above, `isAplite` is being used to both determine whether the Pebble is black and white and whether there is a microphone. It is harmless in this small example, but when the code grows, it could potentially change such that a function both sets up the color and interaction based on a single boolean `isAplite`. This mixes color presentation logic with interaction logic.

Consider the same example using [Feature] detection instead:

```js
var UI = require("ui");
var Feature = require("platform/feature");

var card = new UI.Card({
  title: "Example",
  titleColor: Feature.color("dark-green", "black"),
  subtitle: Feature.round("Hello World!", "Hello!"),
  body: Feature.microphone("Speak to me", "Press up or down"),
});

card.show();
```

Now, if it is necessary to separate the different logic in setting up the card, the individual units can be implemented in separate functions without anything unintentionally mixing the logic together. [Feature] is provided as a module, so it is always available where you decide to move your logic.

The two examples consist of units of logic that consist of one liners, but if each line was instead large blocks of logic with the `isAplite` boolean used throughout, the entanglement issue would be more difficult to remove from your codebase, hence the recommendation to use [Feature] detection. Of course, for capabilities or characteristics that [Feature] is unable to allow you to discern, use [Platform].

<breadcrumb>
