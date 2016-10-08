var React = require('react');
var Router = require('react-router');
var CreateButton = require('./CreateButton');

module.exports = React.createClass({
  displayName: 'Header',

  getStyles: function() {
    return {
      container: {
        position: 'relative',
      }
    }
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container" style={styles.container}>
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to={{pathname: '/'}}>
              Lore Tutorial
            </Router.Link>
          </div>
          <CreateButton />
        </div>
      </nav>
    );
  }
});
