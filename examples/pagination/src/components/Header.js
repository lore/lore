import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';

export default createReactClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to={{pathname: '/'}}>
              Pagination
            </Link>
          </div>
        </div>
      </nav>
    );
  }
});
