import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import PayloadStates from '../constants/PayloadStates';

export default createReactClass({
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
    const { todo } = this.props;

    lore.dialog.show(function() {
      return lore.dialogs.todo.update(todo, {
        request: function(data) {
          return lore.actions.todo.update(todo, data).payload;
        }
      });
    });
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
    const { todo } = this.props;
    const styles = this.getStyles(todo.data.isCompleted);

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
