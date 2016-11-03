var React = require('react');

module.exports = React.createClass({
  displayName: 'EditLink',

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
    var styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onEdit}>
        edit
      </a>
    );
  }

});
