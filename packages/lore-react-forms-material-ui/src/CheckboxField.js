import React from 'react';
import _ from 'lodash';
import { Checkbox } from 'material-ui';
import { Field } from 'lore-react-forms';

class CheckboxField extends Field {

  onChange(event, checked) {
    this.onBlur();
    this.props.onChange(this.props.name, checked);
  }

  render() {
    const name = this.props.name;
    // const error = this.props.errors[name];
    const value = this.props.data[name];
    // const touched = this.state.touched;
    const label = this.props.label;

    const style = _.assign({}, { width: '100%' }, this.props.style);

    return (
      <Checkbox
        style={style}
        label={label}
        checked={value}
        onCheck={this.onChange}
      />
    );
  }

}

export default CheckboxField;
