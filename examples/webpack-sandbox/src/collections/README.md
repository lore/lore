# app/src/collections

### Purpose

This folder is where you can override any framework conventions related to specific collections. If you're application
consumes a single API, and that API has consistent conventions across all the endpoints, you shouldn't need to create 
any files in this folder. If your application consumes multiple endpoints, you'll need to create files in here to 
notify Lore which collections belong to which endpoints.  You'll also need to define files in this folder if the
API you're consuming has inconsistent structure across the endpoints, and you need to define a custom parse method
for specific collections (meaning the default parse method in `config/collections.js` isn't applicable to every
collection.

### Example

```js
module.exports = {

  properties: {

    // parse: function(attributes) {
    //   return attributes;
    // }

  }

};
```
