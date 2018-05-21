import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';
import Utils from './utils';
import Filters from '../constants/Filters';

export default createReactClass({

  render: function () {
    const activeTodoWord = Utils.pluralize(this.props.count, 'item');
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <Link
              to={{ pathname: "/todos", query: {filter: Filters.ALL_TODOS} }}
              activeClassName="selected">
                All
            </Link>
          </li>
          {' '}
          <li>
            <Link
              to={{ pathname: "/todos", query: {filter: Filters.ACTIVE_TODOS} }}
              activeClassName="selected">
                Active
            </Link>
          </li>
          {' '}
          <li>
            <Link
              to={{ pathname: "/todos", query: {filter: Filters.COMPLETED_TODOS} }}
              activeClassName="selected">
                Completed
            </Link>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }

});
