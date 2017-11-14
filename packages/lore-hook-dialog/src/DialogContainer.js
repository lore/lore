import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default function(lore) {
  return createReactClass({
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
