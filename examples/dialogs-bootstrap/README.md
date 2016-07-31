# pagination

Example application to demonstrate how to configure and use the `lore-hook-dialogs-bootstrap` hook. Supports 4 data types: string, text, boolean and number.

![lore_example_bootstrap_dialogs_1](https://cloud.githubusercontent.com/assets/2637399/17275569/8ec4bad8-56c1-11e6-8493-4c52a1ebdbaa.png)


## Usage

To run the example, first install the dependencies:

```
npm install
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.

## Notes

To create a todo, you invoke the `lore.dialog.show` method (that knows how to mount a React component into the `<div id="dialog"></div>` element) and pass it the dialog you want mounted. The only prop you need to pass in when creating a dialog is the method that should be invoked once the user submits/saves the dialog.

```js
onClick: function() {
    function createTodo(params) {
      lore.actions.todo.create(params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        onSubmit: createTodo
      });
    })
  },
```

Invoke the `update` dialog is similar, except that you also need to pass in the model that you're going to update (so the dialog's fields are pre-populated with the existing data):

```js
onEdit: function() {
    var todo = this.props.todo;

    function updateTodo(params) {
      lore.actions.todo.update(todo, params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.update({
        model: todo,
        onSubmit: updateTodo
      });
    });
  },
```

In both cases, the dialog launched is very similar, and looks like this (not very attractive at the moment, needs more configuration options):

![lore_example_bootstrap_dialogs_2](https://cloud.githubusercontent.com/assets/2637399/17275573/953c2d24-56c1-11e6-8bd7-78120db25689.png)

To delete data, you invoke the `destroy` dialog like this:

```js
onDestroy: function() {
    var todo = this.props.todo;

    function destroyTodo() {
      lore.actions.todo.destroy(todo);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.destroy({
        model: todo,
        onSubmit: destroyTodo
      });
    });
  },
```

That dialog is very basic right now, and simply asks the user to confirm that they would like to delete the data.

![lore_example_bootstrap_dialogs_3](https://cloud.githubusercontent.com/assets/2637399/17275574/99ecbd48-56c1-11e6-853d-617fcc6c0ee3.png)
