/* eslint consistent-return: "off" */

import React from 'react';
import _ from 'lodash';

export default React.createClass({
  displayName: 'FormSection',

  propTypes: {
    element: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    children: React.PropTypes.node.isRequired
  },

  getDefaultProps: function() {
    return {
      element: 'div',
      className: '',
      style: {}
    };
  },

  createFields: function() {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        const props = _.omit(this.props, ['className', 'style', 'children']);
        return React.cloneElement(child, props);
      }
    });
  },

  render: function() {
    const element = this.props.element;
    const className = this.props.className;
    const style = this.props.style;

    const props = {
      className: className || null,
      style: style || null
    };

    return React.createElement(element, props,
      this.createFields()
    );

    // return (
    //   <div className={className} style={style}>
    //     {this.createFields()}
    //   </div>
    // );
  }

});
