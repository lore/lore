# Lore

This directory contains all of the code for Lore.

### Organization

Lore's architecture is built around a series of plugins, and these plugins are where its opinions and conventions 
are expressed.  As Lore's goal is to *respectfully* opinionated, each of these plugins can also be overriden with 
your own implementation if needed.
 
Lore is broken apart into 3 main sections:

###### **/app**
This is where the Lore engine resides.  It's principle responsibilities are:
1. Build the project-specific config
2. To load and execute each of the plugins
3. Render the application to the DOM

###### **/hooks**
Each folder under `/hooks` contains one of the hooks (plugins) that Lore uses to build it's behaviors.

###### **/loaders**
Anything that requires physically reading files goes into `/loaders`.  This is because the way files are loaded needed 
to be abstracted out to support testing.

### Note about Singleton behavior

The `./index.js` file that exposes Lore does so like this:

```js
var Lore = require('./app');
module.exports = new Lore();
```

This approach means that *any* file that requires lore will receive the same instance, so there's no need to pass 
lore around in `context` or `props` to access it.  Instead, just `var lore = require('lore')` in the file that 
needs it, and then access it directly like `lore.config` or `lore.models`.

In a browser, you can create a shortcut to `lore` by exposing it in the global namespace like this:

```js
var lore = require('lore');
window.lore = lore;
```

#### This is a concious choice, not a best practice

The decision to expose Lore as a singleton was made purely for convenience.  Lore's design goals (among others) are 
simplicity and ease of use, and when the good and bad were weighed against each other it was decided that it was more 
advantageous to expose it as a singleton, and promote it's usage through `require('lore')` or (optionally) accessing 
it through the global namespace. 

The downside of exposing Lore as a singleton is that it doesn't naturally allow for use cases where you might
want to have two different instances of it running.  The upside is that you don't have to to pass it through the 
application using `props` or `context`, and hooks can choose to be implemented as decorators, which exists outside the 
scope of `props` and `context`.  One example of a decorator hook providing value is `lore.connect`.  Another downside 
to exposing `lore` this way is that testing components becomes less clear.  Because `lore` is not passed through 
`context` or `props`, it's not clear which components depend on data exposed on it, so the contract is incomplete.

When a pattern emerges that's able to maintain the simplicity of behavior that lore exhibits as a singleton, while 
also promoting good development practices like clear contracts, lore will migrate in that direction.  The biggest 
barrier at this point is probably finding an alternate solution for `lore.connect` and other decorators to come.
