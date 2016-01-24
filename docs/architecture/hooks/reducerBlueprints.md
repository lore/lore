# hooks/reducerBlueprints

### Purpose

If enabled, will create default reducers for all models that cover basic find operations - find by query, find by 
id, and find by cid.

Iterates through all models in `lore.models` and creates reducers for all of them.

### Dependant Hooks

Depends on the `models` hook being run first as it iterations through `lore.models`.


### Needed improvements

1. Needs to support pagination.
2. There should be an option to turn off blueprints.
3. `all` needs to be renamed to `find` as it's more accurate (all isn't all, it will often be only a pagninated 
subset of data found based on some query)
4. There's a bug preventing resources that use a number as a unique id from being stored correctly.
5. Should support equality operators, like "find todos that were completed before some data"

### Example Usage

Given a model called `todo`, this hook will create the following reducers:

* lore.reducers.todo.all
* lore.reducers.todo.byId
* lore.reducers.todo.byCid

The reducers are not meant to be accessed or used directly.  Redux handles that.


### Interfaces


#### byId

This reducer has a standard Redux format:

```js
function byId(state, action) {...})
```

It's purpose is to listen for the standard CRUD ActionTypes (`ADD_TODO`, `UPDATE_TODO`, `REMOVE_TODO`, and 
`FETCH_TODOS`) and store the results in a dictionary where the key is the model id.  If a model doesn't have an 
id (which happens during optimistic creates) the model is not stored in the dictionary.  Keeping track of the models
that only exist on the client side is the job of the `byCid` reducer.

Here is an example of the dictionary this reducer returns:

```js
{
  '1': {
    id: '1',
    cid: 'c1',
    data: {..some data..},
    state: "RESOLVED",
    error: {}
  },
  '2': {
    ...
  }
}
```

#### byCid

This reducer has a standard Redux format:

```js
// standard reducer arguments
function byCid(state, action) {...})
```

It's purpose is to listen for the standard CRUD ActionTypes (`ADD_TODO`, `UPDATE_TODO`, `REMOVE_TODO`, and 
`FETCH_TODOS`) and store the results in a dictionary where the key is the model cid.  There should never be a
situation where a model does not have a cid.

Here is an example of the dictionary this reducer returns (note the `c2` resource that has no id and is currently 
being created):

```js
{
  'c1': {
    id: '1',
    cid: 'c1',
    data: {..some data..},
    state: "RESOLVED",
    error: {}
  },
  'c2': {
    id: null,
    cid: 'c2',
    data: {..some data..},
    state: "CREATING",
    error: {}
  }
}
```



#### all

This reducer has a modified Redux format as it requires an additional third 'options' arguments that includes the 
results from the `byId` and `byCid` reducers stored in a `nextState` object.

```
var _byId = byId(state.byId, action);
var _byCid = byCid(state.byCid, action);
var _all = all(state.all, action, {
  nextState: {
    byId: _byId,
    byCid: _byCid
  }
});
```

It's purpose is to store collections of resources group by a common query, and listens for the ActionType
`FETCH_TODOS`. If new data is created that matches the query criteria for one of the lists, it will also make sure
that resource is included inside that list.

Here is an example of the dictionary this reducer returns:

```js
{
  '{}': {
    state: "RESOLVED",
    data: [
      {
        id: '1',
        cid: 'c1',
        data: {
          color: 'red'
        },
        state: "RESOLVED",
        error: {}
      },
      {
        id: '2',
        cid: 'c2',
        data: {
          color: 'blue'
        },
        state: "RESOLVED",
        error: {}
      }
    ],
    error: {}
  },
  '{"color":"blue"}': {
    state: "RESOLVED",
    data: [
      {
        id: '2',
        cid: 'c2',
        data: {
          color: 'blue'
        },
        state: "RESOLVED",
        error: {}
      }
    ],
    error: {}
  }
}
```

The keys for the dictionary are the `JSON.stringify()` version of the query.  For example, a called to `lore.connect`
that looks like this:

```js
lore.connect(function(getState, props) {
  return {
    todos: getState('todo.all', {
      where: {
        color: 'blue'
      }
    })
  }
})
```

Specifies the query `{color: 'blue'}`.  It's that query that gets passed to `JSON.stringify()` and stored as the 
dictionary key.  When new data shows in either the `byId` or `byCid` dictionaries that are new (don't currently exist
in `todo.all`) they are inspected to see whether the any of the stored queries match the data, and if so that data is
inserted into the collection in the dictionary.
