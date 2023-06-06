---
layout: default
---

## Wakeup

[Wakeup]: #wakeup

The Wakeup module allows you to schedule your app to wakeup at a specified time using Pebble's wakeup functionality. Whether the user is in a different watchface or app, your app will launch at the specified time. This allows you to write a custom alarm app, for example. If your app is already running, you may also subscribe to receive the wakeup event, which can be useful for more longer lived timers. With the Wakeup module, you can save data to be read on launch and configure your app to behave differently based on launch data. The Wakeup module, like the Settings module, is backed by localStorage.

### Wakeup

`Wakeup` provides a single module of the same name `Wakeup`.

```js
var Wakeup = require("wakeup");
```

<a id="wakeup-schedule"></a>

#### Wakeup.schedule(options, callback(event))

[Wakeup.schedule]: #wakeup-schedule

Schedules a wakeup event that will wake up the app at the specified time. `callback` will be immediately called asynchronously with whether the wakeup event was successfully set or not. Wakeup events cannot be scheduled within one minute of each other regardless of what app scheduled them. Each app may only schedule up to 8 wakeup events.

See [Clock.weekday] for setting wakeup events at particular times of a weekday.

```js
Wakeup.schedule(
  {
    // Set the wakeup event for one minute from now
    time: Date.now() / 1000 + 60,
    // Pass data for the app on launch
    data: { hello: "world" },
  },
  function (e) {
    if (e.failed) {
      // Log the error reason
      console.log("Wakeup set failed: " + e.error);
    } else {
      console.log("Wakeup set! Event ID: " + e.id);
    }
  }
);
```

The supported `Wakeup.schedule` options are:

| Name             |  Type   | Argument | Default | Description                                                                                                                                                                                                                                                             |
| ---------------- | :-----: | :------: | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time`           | number  | required |         | The time for the app to launch in seconds since the epoch as a number. Time can be specified as a Date object, but is not recommended due to timezone confusion. If using a Date object, no timezone adjustments are necessary if the phone's timezone is properly set. |
| `data`           |   \*    | optional |         | The data to be saved for the app to read on launch. This is optional. See [Wakeup.launch]. Note that `data` is backed by localStorage and is thus saved on the phone. Data must be JSON serializable as it uses `JSON.stringify` to save the data.                      |
| `cookie`         | number  | optional | 0       | A 32-bit unsigned integer to be saved for the app to read on launch. This is an optional alternative to `data` can also be used in combination. The integer is saved on the watch rather than the phone.                                                                |
| `notifyIfMissed` | boolean | optional | false   | The user can miss a wakeup event if their watch is powered off. Specify `true` if you would like Pebble OS to notify them if they missed the event.                                                                                                                     |

Scheduling a wakeup event can result in errors. By providing a `callback`, you can inspect whether or not you have successfully set the wakeup event. The `callback` will be called with a wakeup set result event which has the following properties:

| Name     |  Type   | Description                                                                            |
| -------- | :-----: | -------------------------------------------------------------------------------------- |
| `id`     | number  | If successfully set, the wakeup event id.                                              |
| `error`  | string  | On set failure, the type of error.                                                     |
| `failed` | boolean | `true` if the event could not be set, otherwise `false`.                               |
| `data`   | number  | The custom `data` that was associated with the wakeup event.                           |
| `cookie` | number  | The custom 32-bit unsigned integer `cookie` that was associated with the wakeup event. |

Finally, there are multiple reasons why setting a wakeup event can fail. When a wakeup event fails to be set, `error` can be one of the following strings:

| Error               | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `'range'`           | Another wakeup event is already scheduled close to the requested time. |
| `'invalidArgument'` | The wakeup event was requested to be set in the past.                  |
| `'outOfResources'`  | The app already has the maximum of 8 wakeup events scheduled.          |
| `'internal'`        | There was a Pebble OS error in scheduling the event.                   |

<a id="wakeup-launch"></a>

#### Wakeup.launch(callback(event))

[Wakeup.launch]: #wakeup-launch

If you wish to change the behavior of your app depending on whether it was launched by a wakeup event, and further configure the behavior based on the data associated with the wakeup event, use `Wakeup.launch` on startup. `Wakeup.launch` will immediately call your launch callback asynchronously with a launch event detailing whether or not your app was launched by a wakeup event.

If you require knowing when a wakeup event occurs while your app is already running, refer to [Wakeup.on('wakeup')] to register a wakeup callback that will be called for both launch wakeup events and wakeup events while already running.

```js
// Query whether we were launched by a wakeup event
Wakeup.launch(function (e) {
  if (e.wakeup) {
    console.log("Woke up to " + e.id + "! data: " + JSON.stringify(e.data));
  } else {
    console.log("Regular launch not by a wakeup event.");
  }
});
```

The `callback` will be called with a wakeup launch event. The event has the following properties:

| Name     |  Type   | Description                                                                                                        |
| -------- | :-----: | ------------------------------------------------------------------------------------------------------------------ |
| `id`     | number  | If woken by a wakeup event, the wakeup event id.                                                                   |
| `wakeup` | boolean | `true` if the launch event is a wakeup event, otherwise `false`.                                                   |
| `launch` | boolean | `true` if the launch was caused by this wakeup event, otherwise `false`.                                           |
| `data`   | number  | If woken by a wakeup event, the custom `data` that was associated with the wakeup event.                           |
| `cookie` | number  | If woken by a wakeup event, the custom 32-bit unsigned integer `cookie` that was associated with the wakeup event. |

**Note:** You may have to move portions of your startup logic into the `Wakeup.launch` callback or a function called by the callback. This can also add a very small delay to startup behavior because the underlying implementation must query the watch for the launch information.

<a id="wakeup-on-wakeup"></a>

#### Wakeup.on('wakeup', handler)

[Wakeup.on('wakeup')]: #wakeup-on-wakeup

Registers a handler to call when a wakeup event occurs. This includes launch wakeup events and wakeup events while already running. See [Wakeup.launch] for the properties of the wakeup event object to be passed to the handler.

```js
// Single wakeup event handler example:
Wakeup.on("wakeup", function (e) {
  console.log("Wakeup event! " + JSON.stringify(e));
});
```

If you want your wakeup handler to only receive wakeup events while already running, you can either test against the `.launch` boolean property, or use a wakeup launch handler to block the event from being sent to additional handlers. Wakeup events are sent to launch wakeup handlers first, then to general wakeup handlers next.

```js
// Single already-running example:
Wakeup.on("wakeup", function (e) {
  if (!e.launch) {
    console.log("Already-running wakeup: " + JSON.stringify(e));
  }
});
```

**Note:** Returning false will also prevent further handlers of the same type from receiving the event. Within each type of handlers, they are passed in registration order. The passing process ends if any handler returns false.

```js
// Launch + Already-running example:
// Launch wakeup handler
Wakeup.launch(function (e) {
  if (e.wakeup) {
    console.log("Launch wakeup: " + JSON.stringify(e));
  }
  // Do not pass the event to additional handlers
  return false;
});

// Since the launch wakeup handler returns false,
// this becomes an already-running wakeup handler
Wakeup.on("wakeup", function (e) {
  console.log("Wakeup: " + JSON.stringify(e));
});
```

<a id="wakeup-get"></a>

#### Wakeup.get(id)

[Wakeup.get]: #wakeup-get

Get the wakeup state information by the wakeup id. A wakeup state has the following properties:

| Name             |  Type   | Description                                                                                                                                                         |
| ---------------- | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | number  | The wakeup event id.                                                                                                                                                |
| `time`           | number  | The time for the app to launch. This depends on the data type pass to [Wakeup.schedule]. If a Date object was passed, this can be a string because of localStorage. |
| `data`           | number  | The custom `data` that was associated with the wakeup event.                                                                                                        |
| `cookie`         | number  | The custom 32-bit unsigned integer `cookie` that was associated with the wakeup event.                                                                              |
| `notifyIfMissed` | boolean | Whether it was requested for Pebble OS to notify the user if they missed the wakeup event.                                                                          |

```js
var wakeup = Wakeup.get(wakeupId);
console.log("Wakeup info: " + JSON.stringify(wakeup));
```

<a id="wakeup-each"></a>

#### Wakeup.each(callback(wakeup))

[Wakeup.each]: #wakeup-each

Loops through all scheduled wakeup events that have not yet triggered by calling the `callback` for each wakeup event. See [Wakeup.get] for the properties of the `wakeup` object to be passed to the callback.

```js
var numWakeups = 0;

// Query all wakeups
Wakeup.each(function (e) {
  console.log("Wakeup " + e.id + ": " + JSON.stringify(e));
  ++numWakeups;
});

main.body("Number of wakeups: " + numWakeups);
```

#### Wakeup.cancel(id)

Cancels a particular wakeup event by id. The wakeup event id is obtained by the set result callback when setting a wakeup event. See [Wakeup.schedule].

#### Wakeup.cancel('all')

Cancels all wakeup events scheduled by your app. You can check what wakeup events are set before cancelling them all. See [Wakeup.each].
