---
layout: default
---

### Accel

[Accel]: #accel

The `Accel` module allows you to get events from the accelerometer on Pebble.

You can use the accelerometer in two different ways:

- To detect tap events. Those events are triggered when the user flicks his wrist or tap on the Pebble. They are the same events that are used to turn the Pebble back-light on. Tap events come with a property to tell you in which direction the Pebble was shook. Tap events are very battery efficient because they are generated directly by the accelerometer inside Pebble.
- To continuously receive streaming data from the accelerometer. In this mode the Pebble will collect accelerometer samples at a specified frequency (from 10Hz to 100Hz), batch those events in an array and pass those to an event handler. Because the Pebble accelerometer needs to continuously transmit data to the processor and to the Bluetooth radio, this will drain the battery much faster.

```js
var Accel = require("ui/accel");
```

#### Accel.config(accelConfig)

This function configures the accelerometer `data` events to your liking. The `tap` event requires no configuration for use. Configuring the accelerometer is a very error prone process, so it is recommended to not configure the accelerometer and use `data` events with the default configuration without calling `Accel.config`.

`Accel.config` takes an `accelConfig` object with the following properties:

| Name        |  Type   |  Argument  | Default   | Description                                                                                                                                                                                                     |
| ----------- | :-----: | :--------: | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rate`      | number  | (optional) | 100       | The rate accelerometer data points are generated in hertz. Valid values are 10, 25, 50, and 100.                                                                                                                |
| `samples`   | number  | (optional) | 25        | The number of accelerometer data points to accumulate in a batch before calling the event handler. Valid values are 1 to 25 inclusive.                                                                          |
| `subscribe` | boolean | (optional) | automatic | Whether to subscribe to accelerometer data events. Accel.accelPeek cannot be used when subscribed. Pebble.js will automatically (un)subscribe for you depending on the amount of accelData handlers registered. |

The number of callbacks will depend on the configuration of the accelerometer. With the default rate of 100Hz and 25 samples, your callback will be called every 250ms with 25 samples each time.

**Important:** If you configure the accelerometer to send many `data` events, you will overload the bluetooth connection. We recommend that you send at most 5 events per second.

#### Accel.peek(callback)

Peeks at the current accelerometer value. The callback function will be called with the data point as an event.

```js
Accel.peek(function (e) {
  console.log(
    "Current acceleration on axis are: X=" +
      e.accel.x +
      " Y=" +
      e.accel.y +
      " Z=" +
      e.accel.z
  );
});
```

#### Accel.on('tap', callback)

Subscribe to the `Accel` `tap` event. The callback function will be passed an event with the following fields:

- `axis`: The axis the tap event occurred on: 'x', 'y', or 'z'.
- `direction`: The direction of the tap along the axis: 1 or -1.

```js
Accel.on("tap", function (e) {
  console.log(
    "Tap event on axis: " + e.axis + " and direction: " + e.direction
  );
});
```

A [Window] may subscribe to the `Accel` `tap` event using the `accelTap` event type. The callback function will only be called when the window is visible.

```js
wind.on("accelTap", function (e) {
  console.log("Tapped the window");
});
```

#### Accel.on('data', callback)

Subscribe to the accel 'data' event. The callback function will be passed an event with the following fields:

- `samples`: The number of accelerometer samples in this event.
- `accel`: The first data point in the batch. This is provided for convenience.
- `accels`: The accelerometer samples in an array.

One accelerometer data point is an object with the following properties:

| Property |  Type   | Description                                                                                                                                                               |
| -------- | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x`      | Number  | The acceleration across the x-axis (from left to right when facing your Pebble)                                                                                           |
| `y`      | Number  | The acceleration across the y-axis (from the bottom of the screen to the top of the screen)                                                                               |
| `z`      | Number  | The acceleration across the z-axis (going through your Pebble from the back side of your Pebble to the front side - and then through your head if Pebble is facing you ;) |
| `vibe`   | boolean | A boolean indicating whether Pebble was vibrating when this sample was measured.                                                                                          |
| `time`   | Number  | The amount of ticks in millisecond resolution when this point was measured.                                                                                               |

```js
Accel.on("data", function (e) {
  console.log("Just received " + e.samples + " from the accelerometer.");
});
```

A [Window] may also subscribe to the `Accel` `data` event using the `accelData` event type. The callback function will only be called when the window is visible.

```js
wind.on("accelData", function (e) {
  console.log("Accel data: " + JSON.stringify(e.accels));
});
```
