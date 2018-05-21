import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';
import CreateButton from './CreateButton';

export default createReactClass({
  displayName: 'Header',

  propTypes: {},

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top header">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Normalization
            </Link>
          </div>
          <CreateButton/>
        </div>
      </nav>
    );
  }

});
