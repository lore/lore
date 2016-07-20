var React = require('react');
var PayloadStates = require('../constants/PayloadStates');

module.exports = React.createClass({
  displayName: 'RepositoryCount',

  propTypes: {
    pages: React.PropTypes.array.isRequired
  },

  getStyles: function() {
    return {
      count: {
        textAlign: 'center',
        opacity: '0.54'
      }
    }
  },

  render: function() {
    var pages = this.props.pages;
    var styles = this.getStyles();
    var numberOfPages = pages.length;
    var firstPage = pages[0];
    var lastPage = pages[numberOfPages - 1];
    var repositoriesPerPage = firstPage.data.length;
    var resultCount = 0;
    var totalRepositories = 0;

    if (lastPage.state === PayloadStates.FETCHING) {
      resultCount = (numberOfPages - 1)*repositoriesPerPage;
      totalRepositories = firstPage.meta.totalCount;
    } else {
      resultCount = numberOfPages*repositoriesPerPage;
      totalRepositories = lastPage.meta.totalCount;
    }

    return (
      <h4 style={styles.count}>
        Showing {resultCount} of {totalRepositories} repositories with > 1000 stars
      </h4>
    );
  }

});
