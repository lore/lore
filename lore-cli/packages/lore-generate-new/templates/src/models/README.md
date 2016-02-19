# app/src/models

### Purpose

This folder is where you define the models that your application uses, and is where all the magic/conventions in Lore
derive from.  For example, if you create a file in here called `todo.js`, Lore will see that and generate the following
Reducers and Actions and ActionTypes by default (provided you haven't turned off blueprints).

**Reducers:**
todo.all, todo.by, todo.byCid

**Actions:**
todo.fetchAll, todo.fetch, todo.create, todo.update, todo.destroy

**ActionTypes:**
FETCH_TODOS, FETCH_TODO, CREATE_TODO, UPDATE_TODO, DESTROY_TODO


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
