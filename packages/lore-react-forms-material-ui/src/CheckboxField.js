import React from 'react';
import _ from 'lodash';
import Field from 'lore-react-forms/Field';
import mui from 'material-ui';

class TextField extends Field {

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
      <mui.Checkbox
        style={style}
        label={label}
        checked={value}
        onCheck={this.onChange}
      />
    );
  }

}

export default TextField;
