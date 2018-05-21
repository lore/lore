import React from 'react';
import createReactClass from 'create-react-class';
import UserCanCreateTodo from '../decorators/auth/UserCanCreateTodo';

export default UserCanCreateTodo(createReactClass({
  displayName: 'CreateTodoButton',

  getStyles: function() {
    return {
      createButton: {
        position: 'absolute',
        top: '25px',
        right: '15px',
        zIndex: 1000,
        borderRadius: '100px',
        outline: 'none'
      }
    }
  },

  onClick: function() {
    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        request: function(data) {
          return lore.actions.todo.create(data).payload;
        }
      });
    })
  },

  render: function () {
    const styles = this.getStyles();

    return (
      <button type="button" className="btn btn-primary btn-lg" style={styles.createButton} onClick={this.onClick}>
        +
      </button>
    );
  }
}));
