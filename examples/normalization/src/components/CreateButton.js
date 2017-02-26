var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'CreateButton',

  onClick: function() {
    function createTweet(params) {
      lore.actions.tweet.create(_.extend(params, {
        userId: 1,
        createdAt: new Date().toISOString()
      }));
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.create({
        onSubmit: createTweet
      });
    });
  },

  render: function() {
    return (
      <button
        type="button"
        className="btn btn-primary btn-lg create-button"
        onClick={this.onClick}>
        +
      </button>
    );
  }

});
