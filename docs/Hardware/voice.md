---
layout: default
---

### Voice

[Voice]: #voice

The `Voice` module allows you to interact with Pebble's dictation API on supported platforms (Basalt and Chalk).

```js
var Voice = require("ui/voice");
```

#### Voice.dictate('start', [confirmDialog,] callback)

This function starts the dictation UI, and invokes the callback upon completion. The callback is passed an event with the following fields:

- `err`: A string describing the error, or `null` on success.
- `transcription`: The transcribed string.

An optional second parameter, `confirmDialog`, can be passed to the `Voice.dictate` method to control whether there should be a confirmation dialog displaying the transcription text after voice input. If `confirmDialog` is set to `false`, the confirmation dialog will be skipped. By default, there will be a confirmation dialog.

```js
// Start a diction session and skip confirmation
Voice.dictate("start", false, function (e) {
  if (e.err) {
    console.log("Error: " + e.err);
    return;
  }

  main.subtitle("Success: " + e.transcription);
});
```

**NOTE:** Only one dictation session can be active at any time. Trying to call `Voice.dicate('start', ...)` while another dictation session is in progress will result in the callback being called with an event having the error `"sessionAlreadyInProgress"`.

#### Voice.dictate('stop')

This function stops a dictation session that is currently in progress and prevents the session's callback from being invoked. If no session is in progress this method has no effect.

```js
Voice.dictate("stop");
```
