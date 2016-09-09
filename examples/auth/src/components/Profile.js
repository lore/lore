var React = require('react');
var Router = require('react-router');

module.exports = lore.connect(function(getState, props) {
    return {
      user: getState('user.current'),
      userPermissions: getState('permission.forCurrentUser')
    };
  })(
  Router.withRouter(React.createClass({
    displayName: 'Profile',

    propTypes: {
      user: React.PropTypes.object.isRequired,
      userPermissions: React.PropTypes.object.isRequired
    },

    getStyles: function() {
      return {
        card: {
          position: 'relative',
          display: 'block',
          marginBottom: '.75rem',
          backgroundColor: '#fff',
          borderRadius: '.25rem',
          border: '1px solid rgba(0,0,0,.125)',
          marginTop: '20px'
        },
        cardBlock: {
          padding: '1.25rem'
        },
        avatar: {
          width: '40px',
          // display: 'inline-block',
          position: 'absolute',
          top: '-20px',
          left: '50%'
        },
        permissions: {
          marginLeft: '-12px'
        }
      }
    },

    logout: function() {
      this.props.router.push('/logout');
    },

    render: function() {
      var user = this.props.user;
      var userPermissions = this.props.userPermissions;
      var styles = this.getStyles();

      var permissions = userPermissions.data.map(function(permission) {
        return (
          <li key={permission.id}>
            {permission.data.description}
          </li>
        );
      });

      // if (user.data.nickname === 'admin') {
      //   permissions = 'You are allowed to create, edit, update and delete todos.'
      // } else {
      //   permissions = 'You are only allowed to view todos.';
      // }

      return (
        <div className="card" style={styles.card}>
          <div className="card-block" style={styles.cardBlock}>
            <img
              className="img-circle"
              src={user.data.picture}
              style={styles.avatar} />
              <h4 className="card-title">
                Hi {user.data.nickname}!
              </h4>
              <div className="card-text">
                <p>You have permission to perform the following:</p>
                <ul style={styles.permissions}>
                  {permissions}
                </ul>
              </div>
              <button className="btn btn-primary" onClick={this.logout}>
                Logout
              </button>
          </div>
        </div>
      );
    }

  }))
);
