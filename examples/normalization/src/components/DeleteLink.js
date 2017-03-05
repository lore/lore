var React = require('react');

module.exports = React.createClass({
  displayName: 'DeleteLink',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  onDestroy: function() {
    var tweet = this.props.tweet;

    function destroyTweet() {
      lore.actions.tweet.destroy(tweet);
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.destroy({
        model: tweet,
        onSubmit: destroyTweet
      });
    });
  },

  render: function() {
    return (
      <a className="link" onClick={this.onDestroy}>
        delete
      </a>
    );
  }

});
