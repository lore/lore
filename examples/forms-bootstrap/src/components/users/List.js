var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
// var Spinner = require('../common/Spinner');
var PayloadStates = require('../../constants/PayloadStates');
var Connect = require('../Connect');
var User = require('./User');

module.exports = lore.connect(function(getState, props){
  return {
    newUsers: getState('user.all', {
      where: function(user) {
        return !user.id || (user.data.createdAt - lore.timestamp) > 0
      },
      sortBy: function(user) {
        return -user.data.createdAt;
      }
    }),
    users: getState('user.find', {
      where: {
        createdAt_lte: lore.timestamp,
        _sort: 'createdAt',
        _order: 'DESC'
      }
    })
  }
})(
Router.withRouter(React.createClass({
  displayName: 'List',

  propTypes: {
    users: React.PropTypes.object.isRequired,
    newUsers: React.PropTypes.object.isRequired
  },

  renderUser: function(user) {
    return (
      <User key={user.id || user.cid} user={user} />
    )
  },

  render: function() {
    var users = this.props.users;

    if (users.state === PayloadStates.FETCHING) {
      return (
        <div>Loading...</div>
      );
    }

    var newUsers = this.props.newUsers.data.map(this.renderUser);

    return (
      <div>
        <h2>
          Users
        </h2>
        <div className="media-list tweets list-group">
          {newUsers}
          {users.data.map(this.renderUser)}
        </div>
      </div>
    );
  }

}))
);
