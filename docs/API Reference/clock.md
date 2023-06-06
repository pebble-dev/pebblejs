---
layout: default
---

## Clock

The Clock module makes working with the [Wakeup] module simpler with its provided time utility functions.

### Clock

`Clock` provides a single module of the same name `Clock`.

```js
var Clock = require("clock");
```

<a id="clock-weekday"></a>

#### Clock.weekday(weekday, hour, minute[, seconds])

[Clock.weekday]: #clock-weekday

Calculates the seconds since the epoch until the next nearest moment of the given weekday and time parameters. `weekday` can either be a string representation of the weekday name such as `sunday`, or the 0-based index number, such as 0 for sunday. `hour` is a number 0-23 with 0-12 indicating the morning or a.m. times. `minute` and `seconds` numbers 0-59. `seconds` is optional.

The weekday is always the next occurrence and is not limited by the current week. For example, if today is Wednesday, and `'tuesday'` is given for `weekday`, the resulting time will be referring to Tuesday of next week at least 5 days from now. Similarly, if today is Wednesday and `'Thursday'` is given, the time will be referring to tomorrow, the Thursday of the same week, between 0 to 2 days from now. This is useful for specifying the time for [Wakeup.schedule].

```js
// Next Tuesday at 6:00 a.m.
var nextTime = Clock.weekday("tuesday", 6, 0);
console.log("Seconds until then: " + (nextTime - Date.now()));

var Wakeup = require("wakeup");

// Schedule a wakeup event.
Wakeup.schedule({ time: nextTime }, function (e) {
  if (e.failed) {
    console.log("Wakeup set failed: " + e.error);
  } else {
    console.log("Wakeup set! Event ID: " + e.id);
  }
});
```
