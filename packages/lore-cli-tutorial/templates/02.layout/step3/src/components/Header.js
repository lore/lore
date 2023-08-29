import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <nav className="navbar navbar-default navbar-static-top header">
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">
            Lore Quickstart
          </div>
        </div>
      </div>
    </nav>
  );
}
