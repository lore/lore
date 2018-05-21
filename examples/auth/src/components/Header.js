import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CreateTodoButton from './CreateTodoButton';

export default createReactClass({
  displayName: 'Header',

  getStyles: function() {
    return {
      container: {
        position: 'relative',
      }
    }
  },

  render: function () {
    const styles = this.getStyles();

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container" style={styles.container}>
          <div className="navbar-header">
            <Link className="navbar-brand" to={{pathname: '/'}}>
              Authentication & Authorization
            </Link>
          </div>
          <CreateTodoButton />
        </div>
      </nav>
    );
  }
});
