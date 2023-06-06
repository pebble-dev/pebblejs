---
layout: default
---

## Timeline

[Timeline]: #timeline

The Timeline module allows your app to handle a launch via a timeline action. This allows you to write a custom handler to manage launch events outside of the app menu. With the Timeline module, you can preform a specific set of actions based on the action which launched the app.

### Timeline

`Timeline` provides a single module of the same name `Timeline`.

```js
var Timeline = require("timeline");
```

<a id="timeline-launch"></a>

#### Timeline.launch(callback(event))

[Timeline.launch]: #timeline-launch

If you wish to change the behavior of your app depending on whether it was launched by a timeline event, and further configure the behavior based on the data associated with the timeline event, use `Timeline.launch` on startup. `Timeline.launch` will immediately call your launch callback asynchronously with a launch event detailing whether or not your app was launched by a timeline event.

```js
// Query whether we were launched by a timeline event
Timeline.launch(function (e) {
  if (e.action) {
    console.log("Woke up to timeline event: " + e.launchCode + "!");
  } else {
    console.log("Regular launch not by a timeline event.");
  }
});
```

The `callback` will be called with a timeline launch event. The event has the following properties:

| Name         |  Type   | Description                                                       |
| ------------ | :-----: | ----------------------------------------------------------------- |
| `action`     | boolean | `true` if the app woke up by a timeline event, otherwise `false`. |
| `launchCode` | number  | If woken by a timeline event, the code of the action.             |

Note that this means you may have to move portions of your startup logic into the `Timeline.launch` callback or a function called by the callback. This can also add a very small delay to startup behavior because the underlying implementation must query the watch for the launch information.
