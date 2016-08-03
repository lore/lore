var React = require('react');
var mui = require('material-ui');

module.exports = React.createClass({
  displayName: 'NumberField',

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: 0
    }
  },

  getInitialState: function() {
    return {
      error: null
    }
  },

  onChange: function(e){
    var value = e.target.value;
    var valueNumber = Number(value);
    var error = null;

    if (value) {
      if (isNaN(valueNumber)) {
        error = 'Must be a number';
      } else {
        value = valueNumber;
      }
    }

    this.setState({
      error: error
    });

    this.props.onChange({
      target: {
        label: this.props.label,
        value: value
      }
    });
  },

  render: function () {
    var error = this.state.error;

    return (
      <mui.TextField
        floatingLabelText={this.props.label}
        errorText={error}
        value={this.props.value}
        onChange={this.onChange} />
    );
  }
});
