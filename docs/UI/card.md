---
layout: default
---

### Card

[Card]: #card

A Card is a type of [Window] that allows you to display a title, a subtitle, an image and a body on the screen of Pebble.

Just like any window, you can initialize a Card by passing an object to the constructor or by calling accessors to change the properties.

```js
var card = new UI.Card({
  title: "Hello People!",
});
card.body("This is the content of my card!");
```

The properties available on a [Card] are:

| Name            |  Type   | Default | Description                                                                                                                                                                          |
| --------------- | :-----: | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`         | string  | ''      | Text to display in the title field at the top of the screen                                                                                                                          |
| `titleColor`    |  Color  | 'black' | Text color of the title field                                                                                                                                                        |
| `subtitle`      | string  | ''      | Text to display below the title                                                                                                                                                      |
| `subtitleColor` |  Color  | 'black' | Text color of the subtitle field                                                                                                                                                     |
| `body`          | string  | ''      | Text to display in the body field                                                                                                                                                    |
| `bodyColor`     |  Color  | 'black' | Text color of the body field                                                                                                                                                         |
| `icon`          |  Image  | null    | An image to display before the title text. Refer to [Using Images] for instructions on how to include images in your app.                                                            |
| `subicon`       |  Image  | null    | An image to display before the subtitle text. Refer to [Using Images] for instructions on how to include images in your app.                                                         |
| `banner`        |  Image  | null    | An image to display in the center of the screen. Refer to [Using Images] for instructions on how to include images in your app.                                                      |
| `scrollable`    | boolean | false   | Whether the user can scroll this card with the up and down button. When this is enabled, single and long click events on the up and down button will not be transmitted to your app. |
| `style`         | string  | 'small' | Selects the font used to display the body. This can be 'small', 'large' or 'mono'                                                                                                    |

A [Card] is also a [Window] and thus also has Window properties.

The `'small'` and `'large`' styles correspond to the system notification styles. `'mono'` sets a monospace font for the body textfield, enabling more complex text UIs or ASCII art. The `'small'` and `'large'` styles were updated to match the Pebble firmware 3.x design during the 3.11 release. In order to use the older 2.x styles, you may specify `'classic-small'` and `'classic-large'`, however it is encouraged to use the newer styles.

Note that all text fields will automatically span multiple lines if needed and that you can use '\n' to insert line breaks.
