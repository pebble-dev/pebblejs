---
layout: default
---

### Menu

[Menu]: #menu

A menu is a type of [Window] that displays a standard Pebble menu on the screen of Pebble.

Just like any window, you can initialize a Menu by passing an object to the constructor or by calling accessors to change the properties.

The properties available on a [Menu] are:

| Name                       | Type  | Default | Description                                   |
| -------------------------- | :---: | ------- | --------------------------------------------- |
| `sections`                 | Array | `[]`    | A list of all the sections to display.        |
| `backgroundColor`          | Color | `white` | The background color of a menu item.          |
| `textColor`                | Color | `black` | The text color of a menu item.                |
| `highlightBackgroundColor` | Color | `black` | The background color of a selected menu item. |
| `highlightTextColor`       | Color | `white` | The text color of a selected menu item.       |

A menu contains one or more sections.

The properties available on a section are:

| Name              |  Type  | Default | Description                                 |
| ----------------- | :----: | ------- | ------------------------------------------- |
| `items`           | Array  | `[]`    | A list of all the items to display.         |
| `title`           | string | ''      | Title text of the section header.           |
| `backgroundColor` | Color  | `white` | The background color of the section header. |
| `textColor`       | Color  | `black` | The text color of the section header.       |

Each section has a title and contains zero or more items. An item must have a title. Items can also optionally have a subtitle and an icon.

```js
var menu = new UI.Menu({
  backgroundColor: "black",
  textColor: "blue",
  highlightBackgroundColor: "blue",
  highlightTextColor: "black",
  sections: [
    {
      title: "First section",
      items: [
        {
          title: "First Item",
          subtitle: "Some subtitle",
          icon: "images/item_icon.png",
        },
        {
          title: "Second item",
        },
      ],
    },
  ],
});
```

#### Menu.section(sectionIndex, section)

Define the section to be displayed at `sectionIndex`. See [Menu] for the properties of a section.

```js
var section = {
  title: "Another section",
  items: [
    {
      title: "With one item",
    },
  ],
};
menu.section(1, section);
```

When called with no `section`, returns the section at the given `sectionIndex`.

#### Menu.items(sectionIndex, items)

Define the items to display in a specific section. See [Menu] for the properties of an item.

```js
menu.items(0, [{ title: "new item1" }, { title: "new item2" }]);
```

Whell called with no `items`, returns the items of the section at the given `sectionIndex`.

#### Menu.item(sectionIndex, itemIndex, item)

Define the item to display at index `itemIndex` in section `sectionIndex`. See [Menu] for the properties of an item.

```js
menu.item(0, 0, {
  title: "A new item",
  subtitle: "replacing the previous one",
});
```

When called with no `item`, returns the item at the given `sectionIndex` and `itemIndex`.

#### Menu.selection(callback)

Get the currently selected item and section. The callback function will be passed an event with the following fields:

- `menu`: The menu object.
- `section`: The menu section object.
- `sectionIndex`: The section index of the section of the selected item.
- `item`: The menu item object.
- `itemIndex`: The item index of the selected item.

```js
menu.selection(function (e) {
  console.log(
    "Currently selected item is #" +
      e.itemIndex +
      " of section #" +
      e.sectionIndex
  );
  console.log('The item is titled "' + e.item.title + '"');
});
```

#### Menu.selection(sectionIndex, itemIndex)

Change the selected item and section.

```js
// Set the menu selection to the first section's third menu item
menu.selection(0, 2);
```

<a id="menu-on-select-callback"></a>

#### Menu.on('select', callback)

[Menu.on('select', callback)]: #menu-on-select-callback

Registers a callback called when an item in the menu is selected. The callback function will be passed an event with the following fields:

- `menu`: The menu object.
- `section`: The menu section object.
- `sectionIndex`: The section index of the section of the selected item.
- `item`: The menu item object.
- `itemIndex`: The item index of the selected item.

**Note:** You can also register a callback for 'longSelect' event, triggered when the user long clicks on an item.

```js
menu.on("select", function (e) {
  console.log(
    "Selected item #" + e.itemIndex + " of section #" + e.sectionIndex
  );
  console.log('The item is titled "' + e.item.title + '"');
});
```

#### Menu.on('longSelect', callback)

Similar to the select callback, except for long select presses. See [Menu.on('select', callback)].
