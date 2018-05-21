import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../constants/PayloadStates';

const styles = {
  footer: {
    textAlign: 'center',
    marginTop: '32px',
    marginBottom: '64px'
  },
  button: {
    outline: 'none'
  }
};

export default createReactClass({
  displayName: 'LoadMoreButton',

  propTypes: {
    lastPage: PropTypes.object.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    // nextPageMetaField: PropTypes.string.isRequired
  },

  render() {
    const {
      lastPage,
      onLoadMore,
      // nextPageMetaField
    } = this.props;

    if(lastPage.state === PayloadStates.FETCHING) {
      return (
        <div key="loading" style={styles.footer}>
          <button className="btn btn-default btn-lg disabled" style={styles.button}>
            Loading...
          </button>
        </div>
      );
    }

    // if (!lastPage.meta[nextPageMetaField]) {
    //   return (
    //     <div className="footer"/>
    //   );
    // }

    return (
      <div key="more" style={styles.footer}>
        <button className="btn btn-default btn-lg" style={styles.button} onClick={onLoadMore}>
          Load More
        </button>
      </div>
    );
  }

});
