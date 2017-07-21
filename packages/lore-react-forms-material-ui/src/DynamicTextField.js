var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var Field = require('lore-react-forms').Field;

class DynamicTextField extends Field {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = _.debounce(this.handleChange, 250);

    this.state = {
      value: this.props.data[this.props.name]
    }
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
    var name = this.props.name;
    var error = this.props.errors[name];
    // var value = this.props.data[name];
    var value = this.state.value;
    var touched = this.state.touched;
    var hintText = this.props.hintText;
    var label = this.props.label;
    var disabled = this.props.disabled;
    var _model = this.props._model;

    var style = _.assign({}, {width: '100%'}, this.props.style);
    var options = this.props.getMessage ? this.props.getMessage(_model) : {};

    return (
      <div style={{position: 'relative'}}>
        <mui.TextField
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
    )
  }

}

module.exports = DynamicTextField;