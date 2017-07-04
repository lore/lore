import React from 'react';
import { TextField } from 'material-ui';

export default React.createClass({
  displayName: 'NumberField',

  propTypes: {
    attribute: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]).isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: 0
    }
  },

  getInitialState: function() {
    return {
      error: isNaN(Number(this.props.value)) ? 'Must be a number' : null
    }
  },

  onChange: function(e){
    var value = e.target.value;
    var valueNumber = Number(value);
    var error = null;

    if (value) {
      if (isNaN(valueNumber)) {
        error = 'Must be a number';
      } else {
        value = valueNumber;
      }
    }

    this.setState({
      error: error
    });

    this.props.onChange({
      target: {
        label: this.props.label,
        value: value
      }
    });
  },

  render: function () {
    var attribute = this.props.attribute;
    var error = this.state.error;

    return (
      <TextField
        floatingLabelText={attribute.displayName || this.props.label}
        hintText={attribute.placeholder}
        errorText={error}
        value={this.props.value}
        onChange={this.onChange} />
    );
  }
});
