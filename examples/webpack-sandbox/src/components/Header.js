import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';

export default createReactClass({
  displayName: 'Header',

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top header">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Webpack Sandbox
            </Link>
          </div>
        </div>
      </nav>
    );
  }

});
