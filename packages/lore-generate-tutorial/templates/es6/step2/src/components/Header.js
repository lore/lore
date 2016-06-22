import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Guessatron 5000
            </a>
          </div>
        </div>
      </nav>
    );
  }

}

export default Header;
