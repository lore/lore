import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default function(lore) {
  return React.createClass({
    displayName: 'DialogContainer',

    propTypes: {
      dialog: PropTypes.object.isRequired
    },

    childContextTypes: {
      history: PropTypes.object
    },

    getChildContext: function () {
      return {
        history: lore.config.router.history
      };
    },

    render: function () {
      const dialog = this.props.dialog;

      return React.createElement(
        Provider, {
          store: lore.store
        },
        dialog
      );
    }
  });
}
