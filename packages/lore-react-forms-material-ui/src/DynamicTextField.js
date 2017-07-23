import React from 'react';
import { TextField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

class DynamicTextField extends Field {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = _.debounce(this.handleChange, 250);

    this.state = {
      value: this.props.data[this.props.name]
    };
  }

  handleChange() {
    this.props.onChange(
      this.props.name,
      this.state.value
    );
  }

  onChange(event, value) {
    this.setState({
      value: value
    });
    this.handleChange();
  }

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    // const value = this.props.data[name];
    const value = this.state.value;
    const touched = this.state.touched;
    const hintText = this.props.hintText;
    const label = this.props.label;
    const disabled = this.props.disabled;
    const _model = this.props._model;

    const style = _.assign({}, { width: '100%' }, this.props.style);
    const options = this.props.getMessage ? this.props.getMessage(_model) : {};

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          style={style}
          floatingLabelText={label}
          floatingLabelFixed={false}
          hintText={hintText}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          errorText={(touched && error) || options.message}
          disabled={disabled}
        />
        {options.icon}
      </div>
    );
  }

}

export default DynamicTextField;
