var React = require('react');

module.exports = React.createClass({
  displayName: 'EditLink',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  onEdit: function() {
    var tweet = this.props.tweet;

    function updateTweet(params) {
      lore.actions.tweet.update(tweet, params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.update({
        model: tweet,
        onSubmit: updateTweet
      });
    });
  },

  render: function() {
    return (
      <a className="link" onClick={this.onEdit}>
        edit
      </a>
    );
  }

});
