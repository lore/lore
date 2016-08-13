var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var _ = require('lodash');
var Spinner = require('./common/Spinner');
var PayloadStates = require('../constants/PayloadStates');
var Todo = require('./Todo');

module.exports = lore.connect(function(getState, props){
    return {
      todos: getState('todo.find')
    }
  })(
  Router.withRouter(React.createClass({
    displayName: 'List',

    propTypes: {
      todos: React.PropTypes.object.isRequired
    },

    getStyles: function() {
      return {
        title: {
          textAlign: 'center',
          marginBottom: '24px',
          marginTop: '32px'
        },
        instructions: {
          textAlign: 'center',
          marginBottom: '24px',
          marginTop: '64px'
        }
      }
    },

    renderTodoDivider: function(result, todo, index, todos) {
      result.push(
        <Todo key={todo.id || todo.cid} todo={todo} />
      );

      if (index < (todos.length - 1)) {
        result.push(
          <mui.Divider
            key={'divider-' + todo.id || todo.cid}
            inset={true} />
        );
      }

      return result;
    },

    render: function() {
      var todos = this.props.todos;
      var styles = this.getStyles();

      if (todos.state === PayloadStates.FETCHING) {
        return <Spinner/>;
      }

      if (todos.data.length > 0) {
        return (
          <div>
            <h2 style={styles.title}>
              Todo List
            </h2>
            <mui.Paper>
              <mui.List>
                {_.reduce(todos.data, this.renderTodoDivider, [])}
              </mui.List>
            </mui.Paper>
          </div>
        );
      } else {
        return (
          <h2 style={styles.instructions}>
            Click the button in the top right to create a todo.
          </h2>
        );
      }
    }

  }))
);
