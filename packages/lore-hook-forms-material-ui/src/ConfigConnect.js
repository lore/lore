/* global lore */
/* eslint prefer-rest-params: "off" */

import React from 'react';
import _ from 'lodash';

export default function() {
  return lore.connect(function(getState, props) {
    return props.callback.apply(null, arguments);
  })(
  React.createClass({
    displayName: 'Connect',

    propTypes: {
      callback: React.PropTypes.func.isRequired,
      children: React.PropTypes.node.isRequired,
    },

    render: function() {
      const props = _.omit(this.props, [
        'callback',
        'children'
      ]);

      return React.cloneElement(this.props.children, props);
    }

  }));
}
