var React = require('react');
var UserCanDestroyTodo = require('../decorators/auth/UserCanDestroyTodo');

module.exports = UserCanDestroyTodo(React.createClass({
  displayName: 'DeleteTodoLink',

  propTypes: {
    todo: React.PropTypes.object.isRequired
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

  render: function() {
    var styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onDestroy}>
        delete
      </a>
    );
  }

}));
