# app/initializers

### Purpose

Any files put in the initializers directory will be ran at Lore start-up.
This is essentially used to boostrap anything needed when your app starts up.

### Example

For example.. let's say for some reason that you want to print 'hello world'
at startup you would add the following file to /initializers

```
/* helloWorld.js */
module.exports = function() {
  console.log('hello world');
};
```
