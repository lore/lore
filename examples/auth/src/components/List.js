var React = require('react');
var Header = require('./Header');
var PayloadStates = require('../constants/PayloadStates');
var Todo = require('./Todo');
var UserCanViewTodos = require('../decorators/auth/UserCanViewTodos');
var EmptyTextText = require('./EmptyListText');

module.exports = UserCanViewTodos(
  lore.connect(function(getState, props) {
    return {
      todos: getState('todo.find')
    }
  })(
  React.createClass({
    displayName: 'List',

    getStyles: function() {
      return {
        title: {
          textAlign: 'center'
        },
        loading: {
          textAlign: 'center',
          marginTop: '64px',
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'rgba(0,0,0,.54)'
        },
        todos: {
          marginTop: '32px'
        },
        emptyText: {
          color: '#777',
          fontSize: '24px',
          textAlign: 'center'
        }
      }
    },

    renderTodo: function(todo) {
      return (
        <Todo key={todo.id || todo.cid} todo={todo} />
      );
    },

    render: function() {
      var todos = this.props.todos;
      var styles = this.getStyles();
      var title = 'Todo List';
      var content = null;

      if (todos.state === PayloadStates.FETCHING) {
        return (
          <div>
            <h2 style={styles.title}>{title}</h2>
            <h2 style={styles.loading}>Loading...</h2>
          </div>
        );
      }

      if (todos.data.length > 0) {
        content = (
          <ul className="media-list" style={styles.todos}>
            {todos.data.map(this.renderTodo)}
          </ul>
        );
      } else {
        // content = (
        //   <p style={styles.emptyText}>
        //     Nothing to be done!
        //   </p>
        // );
        // content = EmptyTextTest(function(){});
        content = (
          <EmptyTextText />
        );
      }

      return (
        <div>
          <h2 style={styles.title}>{title}</h2>
          {content}
        </div>
      );
    }

  })
));
