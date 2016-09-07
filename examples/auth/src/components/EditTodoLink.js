var React = require('react');
var UserCanEditTodo = require('../decorators/auth/UserCanEditTodo');

module.exports = UserCanEditTodo(React.createClass({
  displayName: 'EditTodoLink',

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

  render: function() {
    var styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onEdit}>
        edit
      </a>
    );
  }

}));
