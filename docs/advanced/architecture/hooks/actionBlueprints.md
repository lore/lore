# hooks/actionBlueprints

### Purpose

If enabled, will create default actions for all models that cover basic CRUD operations - Creating, Updating,
Deleting, and Retrieving (both as a list and for a specific resource).

Iterates through all models in `lore.models` and creates actions for all of them.

### Dependant Hooks

Depends on the `models` hook being run first as it iterations through `lore.models`.


### Needed improvements

1. Needs to support pagination.
2. There should be an option to turn off blueprints, as well as limit which ones are created on a model-by-model
basis. For example, based on server permissions, not all resources permit full CRUD operations. While I'm not sure
there's any harm in creating methods that can't be used, it'd be nice to let the framework server as a form of
documentation for which endpoints do and don't exist, or return an error or warning if a disabled action is called
instead of attempting to make the server call and returning an error through the reducers.


### Example Usage

Given a model called `todo`, this hook will create the following actions:


#### create

```js
var todo = lore.actions.todo.create({
  title: 'example todo',
  isCompleted: false
});
```

#### update

```js
var updatedTodo = lore.actions.todo.update(todo, {
  isCompleted: true
});
```

#### destroy

```js
var destroyedTodo = lore.actions.todo.destroy(todo);
```

#### fetch

```js
var todoId = '123';
var todoBeingFetched = lore.actions.todo.fetch(todoId);
```

#### fetchAll

```js
var todosBeingFetched = lore.actions.todo.fetchAll({
  where: {}
});
```
