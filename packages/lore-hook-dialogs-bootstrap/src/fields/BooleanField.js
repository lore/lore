import React from 'react';

export default React.createClass({
  displayName: 'BooleanField',

  propTypes: {
    attribute: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: false
    }
  },

  getStyles: function() {
    return {
      description: {
        marginTop: '-5px',
        marginBottom: '3px',
        color: '#777'
      }
    }
  },

  onChange: function(e){
    var value = e.target.checked;

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
        <input type="checkbox" checked={this.props.value} onChange={this.onChange} />
      </div>
    );
  }

  // render: function () {
  //   var styles = this.getStyles();
  //
  //   return (
  //     <div className="form-group">
  //       <label className="control-label">
  //         {this.props.label}
  //       </label>
  //       <input
  //         type="checkbox"
  //         className="form-control"
  //         style={styles.checkbox}
  //         checked={this.props.value}
  //         onChange={this.onChange} />
  //     </div>
  //   );
  // }
});
