import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import UserCanEditTodo from '../decorators/auth/UserCanEditTodo';

export default UserCanEditTodo(createReactClass({
  displayName: 'EditTodoLink',

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

  onEdit: function() {
    const { todo } = this.props;

    lore.dialog.show(function() {
      return lore.dialogs.todo.update(todo, {
        request: function(data) {
          debugger
          return lore.actions.todo.update(todo, data).payload;
        }
      });
    });
  },

  render: function() {
    const styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onEdit}>
        edit
      </a>
    );
  }

}));
