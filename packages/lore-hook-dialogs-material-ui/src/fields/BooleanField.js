var React = require('react');
var mui = require('material-ui');

module.exports = React.createClass({
  displayName: 'BooleanField',

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: false
    }
  },

  getStyles: function() {
    return {
      field: {
        marginTop: '16px'
      }
    }
  },

  onChange: function(e, isInputChecked){
    var value = e.target.checked;

    this.props.onChange({
      target: {
        label: this.props.label,
        value: value
      }
    });
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <mui.Checkbox
        style={styles.field}
        label={this.props.label}
        checked={this.props.value}
        onCheck={this.onChange}
      />
    )
  }

});
