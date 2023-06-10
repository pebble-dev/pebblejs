---
layout: default
---

### Pebble

The `Pebble` object from [PebbleKit JavaScript](https://developer.rebble.io/developer.pebble.com/docs/pebblekit-js/index.html) is available as a global variable. Some of the methods it provides have Pebble.js equivalents. When available, it is recommended to use the Pebble.js equivalents as they have more documented features and cleaner interfaces.

This table lists the current Pebble.js equivalents:

| Pebble API                                          |                   Pebble.js Equivalent                   |
| --------------------------------------------------- | :------------------------------------------------------: |
| `Pebble.addEventListener('ready', ...)`             | Your application automatically starts after it is ready. |
| `Pebble.addEventListener('showConfiguration', ...)` |                   [Settings.config()]                    |
| `Pebble.addEventListener('webviewclosed', ...)`     |         [Settings.config()] with close handler.          |

Use `Pebble` when there is no Pebble.js alternative. Currently, these are the `Pebble` methods that have no direct Pebble.js alternative:

| Pebble API without Equivalents            |                                Note                                 |
| ----------------------------------------- | :-----------------------------------------------------------------: |
| `Pebble.getAccountToken()`                |                                                                     |
| `Pebble.getActiveWatchInfo()`             | Use [Platform.version()] if only querying for the platform version. |
| `Pebble.getTimelineToken()`               |                                                                     |
| `Pebble.getWatchToken()`                  |                                                                     |
| `Pebble.showSimpleNotificationOnPebble()` |   Consider presenting a [Card] or using Pebble Timeline instead.    |
| `Pebble.timelineSubscribe()`              |                                                                     |
| `Pebble.timelineSubscriptions()`          |                                                                     |
| `Pebble.timelineUnsubscribe()`            |                               &nbsp;                                |
