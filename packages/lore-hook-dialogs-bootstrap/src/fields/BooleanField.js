var React = require('react');

module.exports = React.createClass({
  displayName: 'BooleanField',

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getStyles: function() {
    return {
      checkbox: {
        width: 'inherit',
        height: 'inherit'
      }
    }
  },

  getDefaultProps: function() {
    return {
      value: false
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
    return (
      <div className="checkbox">
        <label className="control-label">
          <input type="checkbox" checked={this.props.value} onChange={this.onChange} /> {this.props.label}
        </label>
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
