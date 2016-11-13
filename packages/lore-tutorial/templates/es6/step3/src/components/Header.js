import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Lore Tutorial
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
