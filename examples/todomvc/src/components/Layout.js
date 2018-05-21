import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Filters from '../constants/Filters';
import TodoFooter from './Footer';
import TodoItem from './TodoItem';
import Credits from './Credits';

const ENTER_KEY = 13;

export default connect(function(getState, props) {
  const location = props.location;

  return {
    todos: getState('todo.findAll', {
      exclude: function(model) {
        return model.state === PayloadStates.DELETED;
      }
    }),
    nowShowing: location.query.filter
  };
})(
  createReactClass({
    displayName: 'Home',

    getInitialState: function () {
      return {
        editing: null,
        newTodo: ''
      };
    },

    propTypes: {
      todos: PropTypes.object.isRequired,
      nowShowing: PropTypes.string.isRequired
    },

    handleChange: function (event) {
      this.setState({
        newTodo: event.target.value
      });
    },

    handleNewTodoKeyDown: function (event) {
      const { newTodo } = this.state;

      if (event.keyCode !== ENTER_KEY) {
        return;
      }

      event.preventDefault();

      const val = newTodo.trim();

      if (val) {
        lore.actions.todo.create({
          title: val,
          isCompleted: false
        });
        this.setState({
          newTodo: ''
        });
      }
    },

    toggleAll: function (event) {
      const { todos } = this.props;
      const checked = event.target.checked;

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
      this.setState({
        editing: todo.id
      });
    },

    save: function (todoToSave, text) {
      lore.actions.todo.update(todoToSave, {
        title: text
      });
      this.setState({
        editing: null
      });
    },

    cancel: function () {
      this.setState({
        editing: null
      });
    },

    clearCompleted: function () {
      const { todos } = this.props;

      todos.data.forEach(function(todo) {
        if (todo.data.isCompleted) {
          lore.actions.todo.destroy(todo);
        }
      });
    },

    render: function () {
      const { todos } = this.props;
      let footer;
      let main;

      const shownTodos = todos.data.filter(function (todo) {
        switch (this.props.nowShowing) {
          case Filters.ACTIVE_TODOS:
            return !todo.data.isCompleted;
          case Filters.COMPLETED_TODOS:
            return todo.data.isCompleted;
          default:
            return true;
        }
      }, this);

      const todoItems = shownTodos.map(function (todo) {
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

      const activeTodoCount = _.reduce(todos.data, function (accum, todo) {
        return todo.data.isCompleted ? accum : accum + 1;
      }, 0);

      const completedCount = todos.data.length - activeTodoCount;

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
