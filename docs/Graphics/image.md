---
layout: default
---

### Image

[Image]: #image

An [Element] that displays an image on the screen.

The [Image] element has the following properties. Just like any other [Element] you can initialize those properties when creating the object or use the accessors.

| Name          |  Type  | Default  | Description                                                                                                                                |
| ------------- | :----: | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `image`       | string | ""       | The resource name or path to the image to display in this element. See [Using Images] for more information and how to add your own images. |
| `compositing` | string | "normal" | The compositing operation used to display the image. See [Image.compositing(compop)] for a list of possible compositing operations.        |

#### Image.image(image)

Sets the image property. See [Image].

<a id="image-compositing"></a>

#### Image.compositing(compop)

[Image.compositing(compop)]: #image-compositing

Sets the compositing operation to be used when rendering. Specify the compositing operation as a string such as `"invert"`. The following is a list of compositing operations available.

| Compositing |                              Description                               |
| ----------- | :--------------------------------------------------------------------: |
| `"normal"`  |            Display the image normally. This is the default.            |
| `"invert"`  |                Display the image with inverted colors.                 |
| `"or"`      |            White pixels are shown, black pixels are clear.             |
| `"and"`     |            Black pixels are shown, white pixels are clear.             |
| `"clear"`   | The image's white pixels are painted as black, and the rest are clear. |
| `"set"`     | The image's black pixels are painted as white, and the rest are clear. |
