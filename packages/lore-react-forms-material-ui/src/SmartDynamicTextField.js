import React from 'react';
import mui from 'material-ui';
import SvgIcons from 'material-ui/svg-icons';
import _ from 'lodash';
import { Field } from 'lore-react-forms';

const PendingIcon = React.createClass({
  render: function() {
    return (
      <mui.CircularProgress
        style={{
          position: 'absolute',
          top: '36px',
          right: '8px'
        }}
        size={16}
        thickness={2}
      />
    );
  }
});

const SuccessIcon = React.createClass({
  render: function() {
    return (
      <SvgIcons.NavigationCheck
        style={{
          position: 'absolute',
          top: '36px',
          right: '8px',
          color: 'green'
        }}
      />
    );
  }
});

const ErrorIcon = React.createClass({
  render: function() {
    return (
      <SvgIcons.AvNotInterested
        style={{
          position: 'absolute',
          top: '36px',
          right: '8px',
          color: 'red'
        }}
      />
    );
  }
});

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
    // const _model = this.props._model;

    const style = _.assign({}, { width: '100%' }, this.props.style);
    // const options = this.props.getMessage ? this.props.getMessage(_model) : {};

    const state = this.props.state;
    const errorText = this.props.errorText;
    let icon = null;

    if (state === 'PENDING') {
      console.log('pending icon');
      icon = this.props.pendingIcon || <PendingIcon />;
    } else if (state === 'SUCCESS') {
      console.log('success icon');
      icon = this.props.successIcon || <SuccessIcon />;
    } else if (state === 'ERROR') {
      console.log('error icon');
      icon = this.props.errorIcon || <ErrorIcon />;
    }

    return (
      <div style={{ position: 'relative' }}>
        <mui.TextField
          style={style}
          floatingLabelText={label}
          floatingLabelFixed={false}
          hintText={hintText}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          errorText={(touched && error) || errorText}
          disabled={disabled}
        />
        {icon}
      </div>
    );
  }

}

export default DynamicTextField;
