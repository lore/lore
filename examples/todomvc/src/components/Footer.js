'use strict';

var React = require('react');
var Router = require('react-router');
var Utils = require('./utils');
var Filters = require('../constants/Filters');

module.exports = React.createClass({

  render: function () {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

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
            <Router.Link
              to="/todos"
              query={{filter: Filters.ALL_TODOS}}
              activeClassName="selected">
                All
            </Router.Link>
          </li>
          {' '}
          <li>
            <Router.Link
              to="/todos"
              query={{filter: Filters.ACTIVE_TODOS}}
              activeClassName="selected">
                Active
            </Router.Link>
          </li>
          {' '}
          <li>
            <Router.Link
              to="/todos"
              query={{filter: Filters.COMPLETED_TODOS}}
              activeClassName="selected">
                Completed
            </Router.Link>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }

});
