---
layout: default
---

### localStorage

`localStorage` is [available for your use](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), but consider using the [Settings] module instead which provides an alternative interface that can save and load JavaScript objects for you.

```js
var Settings = require("settings");

Settings.data("playerInfo", { id: 1, name: "Scott Wozniak" });
var playerInfo = Settings.data("playerInfo");
console.log("Player's name is " + playerInfo.name);
```
