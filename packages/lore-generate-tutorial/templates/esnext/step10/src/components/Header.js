import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to={'/'} className="navbar-brand">
              Guessatron 5000
            </Link>
          </div>
        </div>
      </nav>
    );
  }

}

export default Header;
