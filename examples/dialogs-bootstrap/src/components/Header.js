var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
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
    function createTodo(params) {
      lore.actions.todo.create(params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        onSubmit: createTodo
      });
    })
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container" style={styles.container}>
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to={{pathname: '/'}}>
              Bootstrap Dialogs
            </Router.Link>
          </div>
          <button type="button" className="btn btn-primary btn-lg" style={styles.createButton} onClick={this.onClick}>
            +
          </button>
        </div>
      </nav>
    );
  }
});
