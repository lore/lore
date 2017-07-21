var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var Field = require('lore-react-forms').Field;
var PayloadStates = require('lore-utils').PayloadStates;

class SelectField extends Field {

  onChange(event, key, value) {
    this.onBlur();
    this.props.onChange(this.props.name, value);
    if (this.props.afterChange) {
      this.props.afterChange(this.props.onChange);
    }
  }

  renderOption(option) {
    var text = option.text;
    var value = option.value;

    return (
      <mui.MenuItem
        key={value}
        value={value}
        primaryText={text} />
    );
  }

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;

    var label = this.props.label;
    var options = this.props.options;
    var field = this.props.field;

    if (options.state === PayloadStates.FETCHING) {
      return (
        <mui.CircularProgress />
      )
    }

    function mapDataToOptions(data) {
      return data.map(function(datum) {
        return {
          value: datum.id,
          text: datum.data[field]
        }
      });
    }

    var optionsData = mapDataToOptions(options.data);

    return (
      <mui.SelectField
        fullWidth={true}
        maxHeight={200}
        floatingLabelText={label}
        value={value}
        onChange={this.onChange}
        errorText={touched && error}
      >
        {[this.renderOption({ value: null, text: ''})].concat(
          optionsData.map(this.renderOption)
        )}
      </mui.SelectField>
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

module.exports = SelectField;
