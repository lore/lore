var React = require('react');
var Filters = require('../constants/Filters');
var TodoFooter = require('./Footer');
var TodoItem = require('./TodoItem');
var Credits = require('./Credits');
var _ = require('lodash');

var ENTER_KEY = 13;

module.exports = lore.connect(function(getState, props) {
    return {
      todos: getState('todo.find'),
      nowShowing: props.location.query.filter
    };
  })(
  React.createClass({
    displayName: 'Home',

    getInitialState: function () {
      return {
        editing: null,
        newTodo: ''
      };
    },

    propTypes: {
      todos: React.PropTypes.object.isRequired,
      nowShowing: React.PropTypes.string.isRequired
    },

    handleChange: function (event) {
      this.setState({newTodo: event.target.value});
    },

    handleNewTodoKeyDown: function (event) {
      if (event.keyCode !== ENTER_KEY) {
        return;
      }

      event.preventDefault();

      var val = this.state.newTodo.trim();

      if (val) {
        lore.actions.todo.create({
          title: val
        });
        this.setState({newTodo: ''});
      }
    },

    toggleAll: function (event) {
      var checked = event.target.checked;
      var todos = this.props.todos;
      todos.data.forEach(function(todo) {
        lore.actions.todo.update(todo, {
          isCompleted: checked
        })
      });
    },

    toggle: function (todoToToggle) {
      lore.actions.todo.update(todoToToggle, {
        isCompleted: !todoToToggle.data.isCompleted
      });
    },

    destroy: function (todo) {
      lore.actions.todo.destroy(todo);
    },

    edit: function (todo) {
      this.setState({editing: todo.id});
    },

    save: function (todoToSave, text) {
      lore.actions.todo.update(todoToSave, {
        title: text
      });
      this.setState({editing: null});
    },

    cancel: function () {
      this.setState({editing: null});
    },

    clearCompleted: function () {
      var todos = this.props.todos;
      todos.data.forEach(function(todo) {
        if (todo.data.isCompleted) {
          lore.actions.todo.destroy(todo);
        }
      });
    },

    render: function () {
      var footer;
      var main;
      var todos = this.props.todos;

      var shownTodos = todos.data.filter(function (todo) {
        switch (this.props.nowShowing) {
          case Filters.ACTIVE_TODOS:
            return !todo.data.isCompleted;
          case Filters.COMPLETED_TODOS:
            return todo.data.isCompleted;
          default:
            return true;
        }
      }, this);

      var todoItems = shownTodos.map(function (todo) {
        return (
          <TodoItem
            key={todo.id || todo.cid}
            todo={todo}
            onToggle={this.toggle.bind(this, todo)}
            onDestroy={this.destroy.bind(this, todo)}
            onEdit={this.edit.bind(this, todo)}
            editing={this.state.editing === todo.id}
            onSave={this.save.bind(this, todo)}
            onCancel={this.cancel}
          />
        );
      }, this);

      var activeTodoCount = _.reduce(todos.data, function (accum, todo) {
        return todo.data.isCompleted ? accum : accum + 1;
      }, 0);

      var completedCount = todos.data.length - activeTodoCount;

      if (activeTodoCount || completedCount) {
        footer =
          <TodoFooter
            count={activeTodoCount}
            completedCount={completedCount}
            nowShowing={this.props.nowShowing}
            onClearCompleted={this.clearCompleted}
          />;
      }

      if (todos.data.length) {
        main = (
          <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              onChange={this.toggleAll}
              checked={activeTodoCount === 0}
            />
            <ul className="todo-list">
              {todoItems}
            </ul>
          </section>
        );
      }

      return (
        <div>
          <div className="todoapp">
            <header className="header">
              <h1>todos</h1>
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.state.newTodo}
                onKeyDown={this.handleNewTodoKeyDown}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </header>
            {main}
            {footer}
          </div>
          <Credits />
        </div>
      );
    }

  })
);
