var React = require('react');
var _ = require('lodash');
var Field = require('./common/BootstrapField');

class TextField extends Field {

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;
    var hintText = this.props.hintText;
    var label = this.props.label;
    var disabled = this.props.disabled;
    var multiLine = this.props.multiLine || false;
    var displayError = touched && error;

    var style = _.assign({}, {width: '100%'}, this.props.style);

    return (
      <div className={"form-group" + (displayError ? " has-error" : "")}>
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
          <span className="help-block">{error}</span>
        ) : null}
      </div>
    );
  }

}

module.exports = TextField;
