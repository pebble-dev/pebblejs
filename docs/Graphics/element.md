---
layout: default
---

### Element

[Element]: #element

There are seven types of [Element] that can be instantiated at the moment: [Circle], [Image], [Line], [Radial], [Rect], [Text], [TimeText].

Most elements share these common properties:

| Name              |  Type   | Default | Description                                                             |
| ----------------- | :-----: | ------- | ----------------------------------------------------------------------- |
| `position`        | Vector2 |         | Position of this element in the window.                                 |
| `size`            | Vector2 |         | Size of this element in this window. [Circle] uses `radius` instead.    |
| `borderWidth`     | number  | 0       | Width of the border of this element. [Line] uses `strokeWidth` instead. |
| `borderColor`     |  Color  | 'clear' | Color of the border of this element. [Line] uses `strokeColor` instead. |
| `backgroundColor` |  Color  | 'white' | Background color of this element. [Line] has no background.             |

All properties can be initialized by passing an object when creating the Element, and changed with accessors functions that have the same name as the properties. Calling an accessor without a parameter will return the current value.

```js
var Vector2 = require("vector2");
var element = new Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
});
element.borderColor("white");
console.log("This element background color is: " + element.backgroundColor());
```

#### Element.index()

Returns the index of the element in its [Window] or -1 if the element is not part of a window.

#### Element.remove()

Removes the element from its [Window].

#### Element.animate(animateDef, [duration=400])

The `position` and `size` are currently the only Element properties that can be animated. An `animateDef` is object with any supported properties specified. See [Element] for a description of those properties. The default animation duration is 400 milliseconds.

```js
// Use the element's position and size to avoid allocating more vectors.
var pos = element.position();
var size = element.size();

// Use the *Self methods to also avoid allocating more vectors.
pos.addSelf(size);
size.addSelf(size);

// Schedule the animation with an animateDef
element.animate({ position: pos, size: size });
```

Each element has its own animation queue. Animations are queued when `Element.animate` is called multiple times at once with the same element. The animations will occur in order, and the first animation will occur immediately. Note that because each element has its own queue, calling `Element.animate` across different elements will result all elements animating the same time. To queue animations across multiple elements, see [Element.queue(callback(next))].

When an animation begins, its destination values are saved immediately to the [Element].

`Element.animate` is chainable.

#### Element.animate(field, value, [duration=400])

You can also animate a single property by specifying a field by its name.

```js
var pos = element.position();
pos.y += 20;
element.animate("position", pos, 1000);
```

<a id="element-queue-callback-next"></a>

#### Element.queue(callback(next))

[Element.queue(callback(next))]: #element-queue-callback-next

`Element.queue` can be used to perform tasks that are dependent upon an animation completing, such as preparing the element for a different animation. `Element.queue` can also be used to coordinate animations across different elements. It is recommended to use `Element.queue` instead of a timeout if the same element will be animated after the custom task.

The `callback` you pass to `Element.queue` will be called with a function `next` as the first parameter. When `next` is called, the next item in the animation queue will begin. Items includes callbacks added by `Element.queue` or animations added by `Element.animate` before an animation is complete. Calling `next` is equivalent to calling `Element.dequeue`.

```js
element
  .animate('position', new Vector2(0, 0)
  .queue(function(next) {
    this.backgroundColor('white');
    next();
  })
  .animate('position', new Vector2(0, 50));
```

`Element.queue` is chainable.

#### Element.dequeue()

`Element.dequeue` can be used to continue executing items in the animation queue. It is useful in cases where the `next` function passed in `Element.queue` callbacks is not available. See [Element.queue(callback(next))] for more information on the animation queue.

#### Element.position(position)

Accessor to the `position` property. See [Element].

#### Element.size(size)

Accessor to the `size` property. See [Element].

#### Element.borderWidth(width)

Accessor to the `borderWidth` property. See [Element].

#### Element.borderColor(color)

Accessor to the `borderColor` property. See [Element].

#### Element.backgroundColor(color)

Accessor to the `backgroundColor` property. See [Element].
