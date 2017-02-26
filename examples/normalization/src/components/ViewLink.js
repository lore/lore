var React = require('react');
var Router = require('react-router');

module.exports = Router.withRouter(React.createClass({
  displayName: 'ViewLink',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  },

  onView: function() {
    var tweet = this.props.tweet;
    var router = this.props.router;
    router.push('/tweets/' + tweet.id);
  },

  render: function() {
    return (
      <a className="link" onClick={this.onView}>
        view
      </a>
    );
  }

}));
