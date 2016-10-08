var React = require('react');
var PayloadStates = require('../constants/PayloadStates');

module.exports = React.createClass({
  displayName: 'LoadMoreButton',

  propTypes: {
    lastPage: React.PropTypes.object.isRequired,
    onLoadMore: React.PropTypes.func.isRequired
  },

  getStyles: function() {
    return {
      footer: {
        textAlign: 'center',
        marginTop: '32px',
        marginBottom: '64px'
      },
      button: {
        outline: 'none'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();
    var lastPage = this.props.lastPage;

    if(lastPage.state === PayloadStates.FETCHING) {
      return (
        <div style={styles.footer}>
          <button className="btn btn-default btn-lg disabled" style={styles.button}>
            Loading...
          </button>
        </div>
      );
    }

    if (!lastPage.meta.nextPage) {
      return (
        <div style={styles.footer}></div>
      );
    }

    return (
      <div style={styles.footer}>
        <button className="btn btn-default btn-lg" style={styles.button} onClick={this.props.onLoadMore}>
          Load More
        </button>
      </div>
    );
  }

});
