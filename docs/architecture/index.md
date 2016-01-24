# lib/index.js

### Purpose

Expose Lore as a singleton. 

### Example

This file creates a singleton for Lore like so:

```js
var Lore = require('./app');
module.exports = new Lore();
```

This means that *any* file that requires lore will receive the same instance, so there's no need to pass lore around
an application to any component that needs to access something  like `lore.config` or `lore.models`.

In a browser, you create a shortcut by exposing lore in the global namespace like:

```js
var Lore = require('lore');
var lore = new Lore();
window.lore = lore;
```

Or you can just require it in any file that needs access to it like:

```js
var lore = require('lore');

// now just access it directly - you'll have the same instance as every other file
var x = lore.models.x;
```
