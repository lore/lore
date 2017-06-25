var React = require('react');
var _ = require('lodash');
var Field = require('./common/BootstrapField');

class DynamicTextField extends Field {

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;
    var hintText = this.props.hintText;
    var label = this.props.label;
    var disabled = this.props.disabled;
    var _model = this.props._model;

    var style = _.assign({}, {width: '100%'}, this.props.style);
    var options = this.props.getMessage ? this.props.getMessage(_model) : {};

    var displayError = (touched && error) || options.message;

    return (
      <div className={"form-group" + (displayError ? " has-error" : "")} style={{position: 'relative'}}>
        <label>{label}</label>
        <input
          type="text"
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="form-control"
          placeholder={hintText} />
        {displayError ? (
          <span className="help-block">{error || options.message}</span>
        ) : null}
        <span>
          {options.icon}
        </span>
      </div>
    );
  }

}

module.exports = DynamicTextField;
