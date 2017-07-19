/* eslint prefer-template: "off" */

import React from 'react';
import Field from './common/BootstrapField';

class DynamicTextField extends Field {

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    const value = this.props.data[name];
    const touched = this.state.touched;
    const hintText = this.props.hintText;
    const label = this.props.label;
    // const disabled = this.props.disabled;
    const _model = this.props._model;

    // const style = _.assign({}, {width: '100%'}, this.props.style);
    const options = this.props.getMessage ? this.props.getMessage(_model) : {};

    const displayError = (touched && error) || options.message;

    return (
      <div className={'form-group' + (displayError ? ' has-error' : '')} style={{ position: 'relative' }}>
        <label>{label}</label>
        <input
          type="text"
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="form-control"
          placeholder={hintText}
        />
        {displayError ? (
          <span className="help-block">{error || options.message}</span>
        ) : null}
        <span>
          {options.icon}
        </span>
      </div>
    );
  }

}

export default DynamicTextField;
