import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'EditLink',

  propTypes: {
    tweet: PropTypes.object.isRequired
  },

  onEdit: function() {
    const { tweet } = this.props;

    lore.dialog.show(function() {
      return lore.dialogs.tweet.update(tweet, {
        request: function(data) {
          return lore.actions.tweet.update(tweet, data).payload;
        }
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
