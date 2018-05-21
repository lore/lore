import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../constants/PayloadStates';

export default createReactClass({
  displayName: 'LoadMoreButton',

  propTypes: {
    lastPage: PropTypes.object.isRequired,
    onLoadMore: PropTypes.func.isRequired
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
    const styles = this.getStyles();
    const lastPage = this.props.lastPage;

    if(lastPage.state === PayloadStates.FETCHING) {
      return (
        <div style={styles.footer}>
          <button className="btn btn-default btn-lg disabled" style={styles.button}>
            Loading...
          </button>
        </div>
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
