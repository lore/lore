import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default createReactClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to={{pathname: '/'}}>
              Infinite Scrolling
            </Link>
          </div>
        </div>
      </nav>
    );
  }
});
