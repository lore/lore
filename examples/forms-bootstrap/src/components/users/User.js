var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'User',

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    var user = this.props.user;

    return (
      <Router.Link to={`/users/${user.id}`} className="list-group-item tweet" activeClassName="active">
        <div className="image-container">
          <img
            className="img-circle avatar"
            src={user.data.avatar} />
        </div>
        <div className="content-container">
          <h4 className="list-group-item-heading title">
            {user.data.name}
          </h4>
          <h4 className="list-group-item-heading timestamp">
            {'@' + user.data.username}
          </h4>
          <p className="list-group-item-text text">
            {user.data.avatar}
          </p>
        </div>
      </Router.Link>
    );
  }

});
