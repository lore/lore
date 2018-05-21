import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'DeleteLink',

  propTypes: {
    tweet: PropTypes.object.isRequired
  },

  onDestroy: function() {
    const { tweet } = this.props;

    lore.dialog.show(function() {
      return lore.dialogs.tweet.destroy(tweet, {
        request: function() {
          return lore.actions.tweet.destroy(tweet).payload;
        }
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
