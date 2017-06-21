var React = require('react');

module.exports = React.createClass({
  displayName: 'PropBarrier',

  propTypes: {
    element: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      element: 'div',
      className: ''
    }
  },

  render: function() {
    var element = this.props.element;
    var className = this.props.className;
    var children = this.props.children;

    var props = {
      className: className ? className : null
    };

    if (children.length) {
      return React.createElement(element, props,
        this.props.children
      );
    }

    return this.props.children;
  }

});
