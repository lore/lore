/* eslint prefer-template: "off" */
/* eslint import/no-unresolved: "off" */

import React from 'react';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { PayloadStates } from 'lore-utils';

class SelectField extends Field {

  onChange(event) {
    this.onBlur();

    var option = _.find(this.props.options.data, function(option) {
      return String(option.id) === event.target.value;
    });
    var value = option ? option.id : null;

    this.props.onChange(this.props.name, value);
    if (this.props.afterChange) {
      this.props.afterChange(this.props.onChange);
    }
  }

  renderOption(option) {
    const text = option.text;
    const value = option.value;

    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
  }

  render() {
    const name = this.props.name;
    const error = this.props.errors[name];
    const value = this.props.data[name];
    const touched = this.state.touched;

    const label = this.props.label;
    const options = this.props.options;
    const field = this.props.field;

    const displayError = touched && error;

    if (options.state === PayloadStates.FETCHING) {
      return (
        <div>Loading...</div>
      );
    }

    function mapDataToOptions(data) {
      return data.map(function(datum) {
        return {
          value: datum.id,
          text: datum.data[field]
        };
      });
    }

    const optionsData = mapDataToOptions(options.data);

    return (
      <div className={'form-group' + (displayError ? ' has-error' : '')}>
        <label>{label}</label>
        <select ref="select" className="form-control" onChange={this.onChange} value={value}>
          {[this.renderOption({ value: null, text: '' })].concat(
            optionsData.map(this.renderOption)
          )}
        </select>
        {displayError ? (
          <span className="help-block">{error}</span>
        ) : null}
      </div>
    );
  }

}

SelectField.propTypes = _.assign({}, Field.propTypes, {
  options: React.PropTypes.object.isRequired
});

SelectField.defaultProps = _.assign({}, Field.defaultProps, {
  options: {
    data: []
  }
});

export default SelectField;
