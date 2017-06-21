var React = require('react');
var _ = require('lodash');

class Field extends React.Component {

  constructor(props) {
    super(props);
    var value = props.data[props.name];
    this.state = {
      // value: value,
      touched: false
    };
    this.onChange = _.bind(this.onChange, this);
    this.onFocus = _.bind(this.onFocus, this);
    this.onBlur = _.bind(this.onBlur, this);
  }

  onChange(event, value) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, value);
  }

  onFocus() {
    // no op
  }

  onBlur() {
    this.setState({
      touched: true
    });
  }

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var validators = this.props.validators[name];
    var value = this.props.data[name];

    return (
      <div>{value}</div>
    );
  }

}

Field.propTypes = {
  name: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  validators: React.PropTypes.object.isRequired
};

Field.defaultProps = {
  validators: {},
  data: {},
  // onChange: function(){},
};

module.exports = Field;
