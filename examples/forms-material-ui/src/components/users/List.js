var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var _ = require('lodash');
var Spinner = require('../common/Spinner');
var PayloadStates = require('../../constants/PayloadStates');
var SelectableList = require('../SelectableList');
var Connect = require('../Connect');
var moment = require('moment');
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
      <User
        key={user.id || user.cid}
        value={user.id || user.cid}
        user={user}
        nestedItems={[]}
      />
    );
  },

  render: function() {
    var users = this.props.users;

    if (users.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    var newUsers = this.props.newUsers.data.map(this.renderUser);

    return (
      <div>
        <mui.Paper>
          <mui.Subheader>
            Users
          </mui.Subheader>
          <SelectableList defaultValue={0}>
            {newUsers}
            {users.data.map(this.renderUser)}
          </SelectableList>
        </mui.Paper>
      </div>
    );
  }

}))
);
