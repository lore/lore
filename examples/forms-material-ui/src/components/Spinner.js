var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'Spinner',

  propTypes: {
    display: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      display: function(props) {
        return true;
      }
    }
  },

  getStyles: function() {
    return {
      container: {
        textAlign: 'center',
        marginTop: '32px',
        marginBottom: '32px'
      }
    }
  },

  render: function () {
    var styles = this.getStyles();
    var display = this.props.display(this.props);
    var other = _.omit(this.props, ['children', 'display']);

    if (display) {
      return (
        <div style={styles.container}>
          <mui.CircularProgress size={60} thickness={5}/>
        </div>
      );
    }

    return React.cloneElement(this.props.children, other);
  }

});
