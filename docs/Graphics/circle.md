---
layout: default
---

### Circle

[Circle]: #circle

An [Element] that displays a circle on the screen.

[Circle] also has the additional property `radius` which it uses for size rather than `size`. [Circle] is also different in that it positions its origin at the position, rather than anchoring by its top left. These differences are to keep the graphics operation characteristics that it is built upon.

```js
var wind = new UI.Window();

var circle = new UI.Circle({
  position: new Vector2(72, 84),
  radius: 25,
  backgroundColor: "white",
});

wind.add(circle);
wind.show();
```

#### Circle.radius(radius)

Accessor to the `radius` property. See [Circle]
