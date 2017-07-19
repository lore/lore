import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';
import Field from 'lore-react-forms/Field';

class NumberField extends Field {

  onChange(event, value) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, Number(value));
  }

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    const value = this.props.data[name];
    const touched = this.state.touched;
    const hintText = this.props.hintText;
    const label = this.props.label;
    const disabled = this.props.disabled;
    const multiLine = this.props.multiLine || false;

    const style = _.assign({}, { width: '100%' }, this.props.style);

    return (
      <mui.TextField
        style={style}
        floatingLabelText={label}
        floatingLabelFixed={false}
        hintText={hintText}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        errorText={touched && error}
        disabled={disabled}
        multiLine={multiLine}
      />
    );
  }

}

export default NumberField;
