import React from 'react';
import { Link } from 'react-router';
import CreateButton from './CreateButton';

export default class Header extends React.Component {

  getStyles() {
    return {
      container: {
        position: 'relative',
      }
    }
  }

  render() {
    const styles = this.getStyles();

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container" style={styles.container}>
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Lore Tutorial
            </Link>
          </div>
          <CreateButton/>
        </div>
      </nav>
    );
  }

}
