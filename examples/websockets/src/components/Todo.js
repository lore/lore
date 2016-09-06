var React = require('react');
var PayloadStates = require('../constants/PayloadStates');

module.exports = React.createClass({
  displayName: 'Todo',

  getStyles: function(isCompleted) {
    return {
      priority: {
        marginRight: '8px'
      },
      title: isCompleted ? {
        color: '#d9d9d9',
        textDecoration: 'line-through'
      } : {},
      links: {
        float: 'right'
      },
      link: {
        cursor: 'pointer'
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
    var todo = this.props.todo;
    var styles = this.getStyles(todo.data.isCompleted);

    return (
      <li className="list-group-item">
        <span className="badge pull-left" style={styles.priority}>
          {todo.data.priority}
        </span>
        <div className="pull-right">
          <a style={styles.link} onClick={this.onEdit}>
            edit
          </a>
          {' | '}
          <a style={styles.link} onClick={this.onDestroy}>
            delete
          </a>
        </div>
        <h4 className="list-group-item-heading" style={styles.title}>
          {todo.data.title}
        </h4>
        <p className="list-group-item-text">
          {todo.data.description}
        </p>
      </li>
    );
  }

});
