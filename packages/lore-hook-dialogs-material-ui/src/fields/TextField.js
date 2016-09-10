var React = require('react');
var mui = require('material-ui');

module.exports = React.createClass({
  displayName: 'TextField',

  propTypes: {
    attribute: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: ''
    }
  },

  getStyles: function() {
    return {
      field: {
        width: '100%'
      }
    }
  },

  onChange: function(e){
    var value = e.target.value;

    this.props.onChange({
      target: {
        label: this.props.label,
        value: value
      }
    });
  },

  render: function () {
    var attribute = this.props.attribute;
    var styles = this.getStyles();

    return (
      <mui.TextField
        style={styles.field}
        floatingLabelText={attribute.displayName || this.props.label}
        hintText={attribute.placeholder}
        multiLine={true}
        value={this.props.value}
        onChange={this.onChange} />
    );
  }
});
