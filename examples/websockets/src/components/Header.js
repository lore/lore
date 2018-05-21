import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';

export default createReactClass({
  displayName: 'Header',

  getStyles: function() {
    return {
      container: {
        position: 'relative',
      },
      createButton: {
        position: 'absolute',
        top: '25px',
        right: '15px',
        zIndex: 1000,
        borderRadius: '100px',
        outline: 'none'
      }
    }
  },

  onClick: function() {
    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        request: function(data) {
          return lore.actions.todo.create(data).payload;
        }
      });
    })
  },

  render: function () {
    const styles = this.getStyles();

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container" style={styles.container}>
          <div className="navbar-header">
            <Link className="navbar-brand" to={{pathname: '/'}}>
              WebSockets
            </Link>
          </div>
          <button type="button" className="btn btn-primary btn-lg" style={styles.createButton} onClick={this.onClick}>
            +
          </button>
        </div>
      </nav>
    );
  }
});
