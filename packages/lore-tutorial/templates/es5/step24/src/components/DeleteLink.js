var React = require('react');
var UserCanDeleteTweet = require('../decorators/UserCanDeleteTweet');

module.exports = UserCanDeleteTweet(React.createClass({
  displayName: 'DeleteLink',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  getStyles: function() {
    return {
      link: {
        cursor: 'pointer',
        marginRight: '16px'
      }
    }
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
    var styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onDestroy}>
        delete
      </a>
    );
  }

}));
