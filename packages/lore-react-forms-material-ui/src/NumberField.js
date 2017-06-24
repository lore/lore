var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var Field = require('lore-react-forms/Field');

class NumberField extends Field {

  onChange(event, value) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, Number(value));
  }

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;
    var hintText = this.props.hintText;
    var label = this.props.label;
    var disabled = this.props.disabled;
    var multiLine = this.props.multiLine || false;

    var style = _.assign({}, {width: '100%'}, this.props.style);

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
    )
  }

}

module.exports = NumberField;
