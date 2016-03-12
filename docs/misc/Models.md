# Models

This should be moved into `docs/concepts/Models`, unless it should stay in `basics` and the tutorial should be moved
into a `tutorial` section.

In-progress documentation to explain Lore's Models.
 
```js
module.exports = {

  // Can change on a per-model basis, otherwise inherits from config/models.js
  // apiRoot: 'https://api.exmaple.com',
  
  // Override default behaviors of Lore models. The interface is based heavily
  // on Backbone.Model. See 
  // http://backbonejs.org
  properties: {
    
    // See http://backbonejs.org/#Model-parse
    // parse: function(attributes) {
    //   return attributes;
    // }
    
    // Other commonly useful functions/attributes include
    // toJSON, sync, and idAttribute
  }
};
```

**Quick notes**

Parse and sync can be especially useful when upgrading an application to deal with breaking API changes, as they allow 
you to absorb some of the changes in the model tier, without it rippling out into all of your applications components.
