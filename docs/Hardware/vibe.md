---
layout: default
---

### Vibe

[Vibe]: #vibe

`Vibe` allows you to trigger vibration on the user wrist.

#### Vibe.vibrate(type)

```js
var Vibe = require("ui/vibe");

// Send a long vibration to the user wrist
Vibe.vibrate("long");
```

| Name   |  Type  | Argument | Default | Description                                                 |
| ------ | :----: | :------: | ------- | ----------------------------------------------------------- |
| `type` | string | optional | `short` | The duration of the vibration. `short`, `long` or `double`. |
