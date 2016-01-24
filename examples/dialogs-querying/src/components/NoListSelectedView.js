var React = require('react');
var mui = require('material-ui');

module.exports = React.createClass({
  displayName: 'NoListSelectedView',

  getStyles: function(){
    return {
      content: {
        padding: '64px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div>
        <div style={styles.content}>
          <h2>Select a list to view its todos.</h2>
        </div>
      </div>
    );
  }

});
