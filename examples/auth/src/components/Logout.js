var React = require('react');
var auth = require('../auth');
var Router = require('react-router');
var ActionTypes = require('../constants/ActionTypes');

module.exports = Router.withRouter(React.createClass({
  displayName: 'Logout',

  propTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function(){
    auth.logout();
    lore.store.dispatch({
      type: ActionTypes.RESET_STORE,
      payload: {}
    });
    this.props.router.push('/');
    // window.location.reload();
  },

  render: function() {
    return (
      <h1 className="loading-text">
        Logging out...
      </h1>
    );
  }

}));
