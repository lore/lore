var React = require('react');
var Router = require('react-router');
var UserCanCreateTodo = require('../decorators/auth/UserCanCreateTodo');

module.exports = UserCanCreateTodo(React.createClass({
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
    function createTodo(params) {
      lore.actions.todo.create(params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        onSubmit: createTodo
      });
    })
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <button type="button" className="btn btn-primary btn-lg" style={styles.createButton} onClick={this.onClick}>
        +
      </button>
    );
  }
}));
