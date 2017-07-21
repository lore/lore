var React = require('react');
var _ = require('lodash');
var Field = require('lore-react-forms').Field;
var mui = require('material-ui');

class TextField extends Field {

  onChange(event, checked) {
    this.onBlur();
    this.props.onChange(this.props.name, checked);
  }

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;
    var label = this.props.label;

    var style = _.assign({}, {width: '100%'}, this.props.style);

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

module.exports = TextField;
