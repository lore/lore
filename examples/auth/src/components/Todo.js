import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import EditTodoLink from './EditTodoLink';
import DeleteTodoLink from './DeleteTodoLink';

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
      } : {}
    }
  },

  render: function() {
    const { todo } = this.props;
    const styles = this.getStyles(todo.data.isCompleted);

    const editTodoLink = (
      <EditTodoLink todo={todo}/>
    );

    return (
      <li className="list-group-item">
        <span className="badge pull-left" style={styles.priority}>
          {todo.data.priority}
        </span>
        <div className="pull-right">
          <EditTodoLink todo={todo}/>
          <DeleteTodoLink todo={todo}/>
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
