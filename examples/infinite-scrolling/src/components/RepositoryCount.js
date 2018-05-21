import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../constants/PayloadStates';

export default createReactClass({
  displayName: 'RepositoryCount',

  propTypes: {
    pages: PropTypes.array.isRequired
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
    const pages = this.props.pages;
    const styles = this.getStyles();
    const numberOfPages = pages.length;
    const firstPage = pages[0];
    const lastPage = pages[numberOfPages - 1];
    const repositoriesPerPage = firstPage.data.length;
    let resultCount = 0;
    let totalRepositories = 0;

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
