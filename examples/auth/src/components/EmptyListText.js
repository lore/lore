import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PermissionTypes from '../constants/PermissionTypes';

export default createReactClass({
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
    store: PropTypes.object.isRequired
  },

  render: function() {
    const styles = this.getStyles();
    const storeState = this.context.store.getState();
    const userPermissions = storeState.permission.forCurrentUser;

    const userHasCreatePermission = _.find(userPermissions.data, function(permission) {
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
