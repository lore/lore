var React = require('react');
var moment = require('moment');
var EditLink = require('./EditLink');
var DeleteLink = require('./DeleteLink');
var ViewLink = require('./ViewLink');

module.exports = lore.connect(function(getState, props){
  var tweet = props.tweet;

  return {
    user: getState('user.byId', {
      id: tweet.data.userId
    })
  };
})(
React.createClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

    return (
      <li className="list-group-item tweet">
        <div className="image-container">
          <img
            className="img-circle avatar"
            src={user.data.avatar} />
        </div>
        <div className="content-container">
          <h4 className="list-group-item-heading title">
            {user.data.nickname}
          </h4>
          <h4 className="list-group-item-heading timestamp">
            {'- ' + timestamp}
          </h4>
          <p className="list-group-item-text text">
            {tweet.data.text}
          </p>
          <div>
            <EditLink tweet={tweet} />
            <DeleteLink tweet={tweet} />
            <ViewLink tweet={tweet} />
          </div>
        </div>
      </li>
    );
  }

})
);
