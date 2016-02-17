# lib/app/summon.js

### Purpose

1. Load and build the lore config (from the project's `/config` directory)
2. Initialize lore
3. Make sure tap events will work on touch devices
4. Render the application to the DOM.

### Example

```js
var Lore = require('lore')
var lore = new Lore();

// build and render the application
lore.summon();
```
