import React from 'react';
import { MenuItem, CircularProgress, SelectField as MuiSelectField } from 'material-ui';
import _ from 'lodash';
import { Field } from 'lore-react-forms';
import { PayloadStates } from 'lore-utils';

class SelectField extends Field {

  onChange(event, key, value) {
    this.onBlur();
    this.props.onChange(this.props.name, value);
    if (this.props.afterChange) {
      this.props.afterChange(this.props.onChange);
    }
  }

  renderOption(option) {
    const text = option.text;
    const value = option.value;

    return (
      <MenuItem
        key={value}
        value={value}
        primaryText={text}
      />
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

    if (options.state === PayloadStates.FETCHING) {
      return (
        <CircularProgress />
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
      <MuiSelectField
        fullWidth={true}
        maxHeight={200}
        floatingLabelText={label}
        value={value}
        onChange={this.onChange}
        errorText={touched && error}
      >
        {[this.renderOption({ value: null, text: '' })].concat(
          optionsData.map(this.renderOption)
        )}
      </MuiSelectField>
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
