var React = require('react');
var _ = require('lodash');
var PermissionTypes = require('../constants/PermissionTypes');

module.exports = React.createClass({
  displayName: 'EmptyListText',

  getStyles: function() {
    return {
      emptyText: {
        color: '#777',
        fontSize: '24px',
        textAlign: 'center'
      }
    }
  },

  contextTypes: {
    store: React.PropTypes.object.isRequired
  },

  render: function() {
    var styles = this.getStyles();
    var storeState = this.context.store.getState();
    var userPermissions = storeState.permission.forCurrentUser;

    var userHasCreatePermission = _.find(userPermissions.data, function(permission) {
      return permission.data.name === PermissionTypes.TODO_CREATE;
    });

    if (userHasCreatePermission) {
      return (
        <p style={styles.emptyText}>
          Click the button in the top right to create a todo.
        </p>
      );
    }

    return (
      <div>
        <p style={styles.emptyText}>
          Looks like there is nothing to be done.
        </p>
        <p style={styles.emptyText}>
          Log in as the admin to create tasks.
        </p>
      </div>
    );
  }

});
