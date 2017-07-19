import React from 'react';

export default React.createClass({
  displayName: 'NumberField',

  propTypes: {
    attribute: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: 0
    }
  },

  getStyles: function() {
    return {
      description: {
        marginTop: '-5px',
        color: '#777'
      }
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
    var attribute = this.props.attribute;
    var styles = this.getStyles();

    return (
      <div className="form-group">
        <label className="control-label">
          {attribute.displayName || this.props.label}
        </label>
        <p style={styles.description}>
          {attribute.description}
        </p>
        <input
          type="number"
          className="form-control"
          value={this.props.value}
          onChange={this.onChange} />
      </div>
    );
  }
});
