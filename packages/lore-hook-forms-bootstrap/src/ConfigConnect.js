var React = require('react');
var _ = require('lodash');

module.exports = function() {
  return lore.connect(function(getState, props) {
    return props.callback.apply(null, arguments)
  })(
  React.createClass({
    displayName: 'Connect',

    propTypes: {
      callback: React.PropTypes.func.isRequired,
      children: React.PropTypes.node.isRequired,
    },

    render: function() {
      var props = _.omit(this.props, [
        'callback',
        'children'
      ]);

      return React.cloneElement(this.props.children, props)
    }

  }));
};
