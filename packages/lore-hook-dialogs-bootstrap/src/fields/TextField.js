var React = require('react');

module.exports = React.createClass({
  displayName: 'TextField',

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: ''
    }
  },

  onChange: function(e){
    var value = e.target.value;

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
        <textarea
          type="text"
          className="form-control"
          rows="3"
          value={this.props.value}
          onChange={this.onChange} />
      </div>
    );
  }
});
