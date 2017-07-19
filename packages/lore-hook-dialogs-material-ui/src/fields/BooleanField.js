import React from 'react';
import { Checkbox } from 'material-ui';

export default React.createClass({
  displayName: 'BooleanField',

  propTypes: {
    attribute: React.PropTypes.object.isRequired,
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
    var attribute = this.props.attribute;
    var styles = this.getStyles();

    return (
      <Checkbox
        style={styles.field}
        label={attribute.displayName || this.props.label}
        checked={this.props.value}
        onCheck={this.onChange}
      />
    )
  }

});
