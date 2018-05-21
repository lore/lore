import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';

export default createReactClass({
  displayName: 'CreateButton',

  onClick: function() {
    lore.dialog.show(function() {
      return lore.dialogs.tweet.create({
        request: function(data) {
          return lore.actions.tweet.create(_.assign({}, data, {
            createdAt: new Date().toISOString()
          })).payload;
        }
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
