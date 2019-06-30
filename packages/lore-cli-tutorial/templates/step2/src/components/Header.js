import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              Lore Tutorial
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
