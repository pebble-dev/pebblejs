---
layout: default
---

### Line

[Line]: #line

An [Element] that displays a line on the screen.

[Line] also has these additional properties:

| Name          |  Type   | Default | Description                                                            |
| ------------- | :-----: | ------- | ---------------------------------------------------------------------- |
| `position2`   | Vector2 |         | Ending position of the line where `position` is the starting position. |
| `strokeWidth` | number  | 0       | Width of the line.                                                     |
| `strokeColor` |  Color  | 'clear' | Color of the line.                                                     |

For clarity, [Line] has `strokeWidth` and `strokeColor` instead of `borderWidth` and `borderColor`.

```js
var wind = new UI.Window();

var line = new UI.Line({
  position: new Vector2(10, 10),
  position2: new Vector2(72, 84),
  strokeColor: "white",
});

wind.add(line);
wind.show();
```

#### Line.position2(position)

Accessor to the `position2` ending position property. See [Line].

#### Line.strokeWidth(width)

Accessor to the `strokeWidth` property. See [Line].

#### Line.strokeColor(color)

Accessor to the `strokeColor` property. See [Line].
