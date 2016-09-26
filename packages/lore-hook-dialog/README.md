# lore-hook-dialog

### Purpose

Provide a helper method that knows how to attach dialogs to the DOM. By default it's configured to use the `dialog` 
DOM element in `index.html`, but can be configured to use something else. 

```html
<div id=`dialog`></div>
```

The helper method is appended to `lore.dialog`.

### Dependant Hooks

None.


### Needed improvements

1. Should probably return the dialog in case it needs to be launched through a instance method and not through props.
2. Need to find an example of a dialog that isn't in `material-ui` and re-examine the dialog helper mixin to 
facilitate launching dialogs once they're mounted.

### Example Usage

Given a dialog called `UpdateTodoDialog`, this hook is used like this:

```js
var todo = this.props.todo;

function updateTodo(params) {
  lore.actions.todo.update(todo, params);
}

lore.dialog.show(function(){
  return (
    <UpdateTodoDialog
      todo={todo}
      onSubmit={updateTodo} />
  );
});
```

The `lore.dialog.show` method makes sure the component gets instantiated and mounted to the correct DOM element. It 
also makes sure any dialog previously mounted to that DOM element is removed beforehand. It them executes the code that
causes the dialog to pop onto the screen (which may be a little too specific to `material-ui` currently).

