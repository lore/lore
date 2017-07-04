import React from 'react';

export default React.createClass({
  displayName: 'PropBarrier',

  propTypes: {
    element: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      element: 'div',
      className: ''
    };
  },

  render: function() {
    const element = this.props.element;
    const className = this.props.className;
    const children = this.props.children;

    const props = {
      className: className || null
    };

    if (children.length) {
      return React.createElement(element, props,
        this.props.children
      );
    }

    return this.props.children;
  }

});
