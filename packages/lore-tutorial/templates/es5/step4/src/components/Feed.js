var React = require('react');

module.exports = React.createClass({
  displayName: 'Feed',

  getStyles: function() {
    return {
      title: {
        textAlign: 'center'
      },
      tweets: {
        marginTop: '32px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div>
        <h2 style={styles.title}>
          Feed
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {/* Tweets */}
        </ul>
      </div>
    );
  }

});
