var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var moment = require('moment');

module.exports = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
Router.withRouter(React.createClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var timestamp = moment.unix(tweet.data.createdAt).fromNow().split(' ago')[0];

    return (
      <Router.Link to={`/tweets/${tweet.id}`} className="list-group-item tweet" activeClassName="active">
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
            {'- ' + timestamp}
          </h4>
          <p className="list-group-item-text text">
            {tweet.data.text}
          </p>
        </div>
      </Router.Link>
    );
  }

}))
);
