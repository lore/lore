import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Header from './Header';
import Todo from './Todo';

export default connect(function(getState, props) {
    return {
      todos: getState('todo.findAll', {
        exclude: function(model) {
          return model.state === PayloadStates.DELETED;
        }
      })
    }
  })(
  createReactClass({
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
      const { todos } = this.props;
      const styles = this.getStyles();
      const title = 'Todo List';
      let content = null;

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
        content = (
          <p style={styles.emptyText}>
            Click the button in the top right to create a todo.
          </p>
        )
      }

      return (
        <div>
          <h2 style={styles.title}>{title}</h2>
          {content}
        </div>
      );
    }

  })
);
