var React = require('react');

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

  onChange: function(e){
    var value = Number(e.target.value);

    this.props.onChange({
      target: {
        label: this.props.label,
        value: value
      }
    });
  },

  render: function () {
    return (
      <div className="form-group">
        <label className="control-label">
          {this.props.label}
        </label>
        <input
          type="number"
          className="form-control"
          value={this.props.value}
          onChange={this.onChange} />
      </div>
    );
  }
});
