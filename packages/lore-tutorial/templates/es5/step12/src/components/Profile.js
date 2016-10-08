var React = require('react');

module.exports = React.createClass({
  displayName: 'Profile',

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      user: {
        id: 1,
        data: {
          nickname: 'marle',
          avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
        }
      }
    }
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
        width: '48px',
        position: 'absolute',
        top: '-24px',
        left: 'calc(50% - 24px)',
        border: '1px solid gray'
      },
      permissions: {
        marginLeft: '-12px'
      }
    }
  },

  render: function() {
    var user = this.props.user;
    var styles = this.getStyles();

    return (
      <div className="card" style={styles.card}>
        <div className="card-block" style={styles.cardBlock}>
          <img
            className="img-circle"
            src={user.data.avatar}
            style={styles.avatar} />
          <h4 className="card-title">
            Hi {user.data.nickname}!
          </h4>
          <div className="card-text">
            <p>You have permission to perform the following:</p>
            <ul style={styles.permissions}>
              <li>Create Tweets</li>
              <li>Edit your own tweets</li>
              <li>Delete your own tweets</li>
            </ul>
          </div>
          <button className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    );
  }

});
