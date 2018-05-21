import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import UserCanDestroyTodo from '../decorators/auth/UserCanDestroyTodo';

export default UserCanDestroyTodo(createReactClass({
  displayName: 'DeleteTodoLink',

  propTypes: {
    todo: PropTypes.object.isRequired
  },

  getStyles: function() {
    return {
      link: {
        cursor: 'pointer',
        marginLeft: '16px'
      }
    }
  },

  onDestroy: function() {
    const { todo } = this.props;

    lore.dialog.show(function() {
      return lore.dialogs.todo.destroy(todo, {
        request: function() {
          return lore.actions.todo.destroy(todo).payload;
        }
      });
    });
  },

  render: function() {
    const styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onDestroy}>
        delete
      </a>
    );
  }

}));
