---
layout: default
---

### Window

[Window]: #window

`Window` is the basic building block in your Pebble.js application. All windows share some common properties and methods.

Pebble.js provides three types of Windows:

- [Card]: Displays a title, a subtitle, a banner image and text on a screen. The position of the elements are fixed and cannot be changed.
- [Menu]: Displays a menu on the Pebble screen. This is similar to the standard system menu in Pebble.
- [Window]: The `Window` by itself is the most flexible. It allows you to add different [Element]s ([Circle], [Image], [Line], [Radial], [Rect], [Text], [TimeText]) and to specify a position and size for each of them. [Element]s can also be animated.

A `Window` can have the following properties:

| Name         |   Type    | Default | Description                                                                                                                                                                            |
| ------------ | :-------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clear`      |  boolean  |         |                                                                                                                                                                                        |
| `action`     | actionDef | None    | An action bar will be shown when configured with an `actionDef`.                                                                                                                       |
| `fullscreen` |  boolean  | false   | When true, the Pebble status bar will not be visible and the window will use the entire screen.                                                                                        |
| `scrollable` |  boolean  | false   | Whether the user can scroll this Window with the up and down button. When this is enabled, single and long click events on the up and down button will not be transmitted to your app. |

<a id="window-actiondef"></a>

#### Window actionDef

[Window actionDef]: #window-actiondef

A `Window` action bar can be displayed by setting its Window `action` property to an `actionDef`.

An `actionDef` has the following properties:

| Name              | Type  | Default | Description                                                                                             |
| ----------------- | :---: | ------- | ------------------------------------------------------------------------------------------------------- |
| `up`              | Image | None    | An image to display in the action bar, next to the up button.                                           |
| `select`          | Image | None    | An image to display in the action bar, next to the select button.                                       |
| `down`            | Image | None    | An image to display in the action bar, next to the down button.                                         |
| `backgroundColor` | Color | 'black' | The background color of the action bar. You can set this to 'white' for windows with black backgrounds. |

```js
// Set action properties during initialization
var card = new UI.Card({
  action: {
    up: "images/action_icon_plus.png",
    down: "images/action_icon_minus.png",
  },
});

// Set action properties after initialization
card.action({
  up: "images/action_icon_plus.png",
  down: "images/action_icon_minus.png",
});

// Set a single action property
card.action("select", "images/action_icon_checkmark.png");

// Disable the action bar
card.action(false);
```

You will need to add images to your project according to the [Using Images] guide in order to display action bar icons.

<a id="window-statusdef"></a>

#### Window statusDef

[Window statusDef]: #window-statusdef

A `Window` status bar can be displayed by setting its Window `status` property to a `statusDef`:

A `statusDef` has the following properties:

| Name              |  Type  | Default  | Description                                                                                             |
| ----------------- | :----: | -------- | ------------------------------------------------------------------------------------------------------- |
| `separator`       | string | 'dotted' | The separate between the status bar and the content of the window. Can be `'dotted'` or `'none'`.       |
| `color`           | Color  | 'black'  | The foreground color of the status bar used to display the separator and time text.                     |
| `backgroundColor` | Color  | 'white'  | The background color of the status bar. You can set this to 'black' for windows with white backgrounds. |

```js
// Set status properties during initialization
var card = new UI.Card({
  status: {
    color: "white",
    backgroundColor: "black",
  },
});

// Set status properties after initialization
card.status({
  color: "white",
  backgroundColor: "black",
});

// Set a single status property
card.status("separator", "none");

// Disable the status bar
card.status(false);
```

#### Window.show()

This will push the window to the screen and display it. If user press the 'back' button, they will navigate to the previous screen.

#### Window.hide()

This hides the window.

If the window is currently displayed, this will take the user to the previously displayed window.

If the window is not currently displayed, this will remove it from the window stack. The user will not be able to get back to it with the back button.

```js
var splashScreen = new UI.Card({ banner: "images/splash.png" });
splashScreen.show();

var mainScreen = new UI.Menu();

setTimeout(function () {
  // Display the mainScreen
  mainScreen.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  splashScreen.hide();
}, 400);
```

#### Window.on('click', button, handler)

Registers a handler to call when `button` is pressed.

```js
wind.on("click", "up", function () {
  console.log("Up clicked!");
});
```

You can register a handler for the 'up', 'select', 'down', and 'back' buttons.

**Note:** You can also register button handlers for `longClick`.

#### Window.on('longClick', button, handler)

Just like `Window.on('click', button, handler)` but for 'longClick' events.

#### Window.on('show', handler)

Registers a handler to call when the window is shown. This is useful for knowing when a user returns to your window from another. This event is also emitted when programmatically showing the window. This does not include when a Pebble notification popup is exited, revealing your window.

```js
// Define the handler before showing.
wind.on("show", function () {
  console.log("Window is shown!");
});

// The show event will emit, and the handler will be called.
wind.show();
```

#### Window.on('hide', handler)

Registers a handler to call when the window is hidden. This is useful for knowing when a user exits out of your window or when your window is no longer visible because a different window is pushed on top. This event is also emitted when programmatically hiding the window. This does not include when a Pebble notification popup obstructs your window.

It is recommended to use this instead of overriding the back button when appropriate.

```js
wind.on("hide", function () {
  console.log("Window is hidden!");
});
```

#### Window.action(actionDef)

Nested accessor to the `action` property which takes an `actionDef`. Used to configure the action bar with a new `actionDef`. See [Window actionDef].

```js
card.action({
  up: "images/action_icon_up.png",
  down: "images/action_icon_down.png",
});
```

To disable the action bar after enabling it, `false` can be passed in place of an `actionDef`.

```js
// Disable the action bar
card.action(false);
```

#### Window.action(field, value)

`Window.action` can also be called with two arguments, `field` and `value`, to set specific fields of the window's `action` property. `field` is the name of a [Window actionDef] property as a string and `value` is the new property value.

```js
card.action("select", "images/action_icon_checkmark.png");
```

#### Window.status(statusDef)

Nested accessor to the `status` property which takes a `statusDef`. Used to configure the status bar with a new `statusDef`. See [Window statusDef].

```js
card.status({
  color: "white",
  backgroundColor: "black",
});
```

To disable the status bar after enabling it, `false` can be passed in place of `statusDef`.

```js
// Disable the status bar
card.status(false);
```

Similarly, `true` can be used as a [Window statusDef] to represent a `statusDef` with all default properties.

```js
var card = new UI.Card({ status: true });
card.show();
```

#### Window.status(field, value)

`Window.status` can also be called with two arguments, `field` and `value`, to set specific fields of the window's `status` property. `field` is the name of a [Window statusDef] property as a string and `value` is the new property value.

```js
card.status("separator", "none");
```

<a id="window-size"></a>

#### Window.size()

[Window.size()]: #window-size

`Window.size` returns the size of the max viewable content size of the window as a [Vector2] taking into account whether there is an action bar and status bar. A [Window] will return a size that is shorter than a [Window] without for example.

If the automatic consideration of the action bar and status bar does not satisfy your use case, you can use [Feature.resolution()] to obtain the Pebble's screen resolution as a [Vector2].

```js
var wind = new UI.Window({ status: true });

var size = wind.size();
var rect = new UI.Rect({ size: new Vector2(size.x / 4, size.y / 4) });
wind.add(rect);

wind.show();
```

### Window (dynamic)

A [Window] instantiated directly is a dynamic window that can display a completely customizable user interface on the screen. Dynamic windows are initialized empty and will need [Element]s added to it. [Card] and [Menu] will not display elements added to them in this way.

```js
// Create a dynamic window
var wind = new UI.Window();

// Add a rect element
var rect = new UI.Rect({ size: new Vector2(20, 20) });
wind.add(rect);

wind.show();
```

#### Window.add(element)

Adds an element to to the [Window]. The element will be immediately visible.

#### Window.insert(index, element)

Inserts an element at a specific index in the list of Element.

#### Window.remove(element)

Removes an element from the [Window].

#### Window.index(element)

Returns the index of an element in the [Window] or -1 if the element is not in the window.

#### Window.each(callback)

Iterates over all the elements on the [Window].

```js
wind.each(function (element) {
  console.log("Element: " + JSON.stringify(element));
});
```
