var React = require('react');
var _ = require('lodash');
var Field = require('lore-react-forms/Field');

class BootstrapField extends Field {

  onChange(event) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, event.target.value);
  }

}

module.exports = BootstrapField;
