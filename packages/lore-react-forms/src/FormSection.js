var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
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
    }
  },

  createFields: function() {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        var props = _.omit(this.props, ['className', 'style', 'children']);
        return React.cloneElement(child, props);
      }
    });
  },

  render: function() {
    var element = this.props.element;
    var className = this.props.className;
    var style = this.props.style;

    var props = {
      className: className ? className : null,
      style: style ? style : null,
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
