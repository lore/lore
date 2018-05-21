import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getState } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import LoadMoreButton from './LoadMoreButton';

const styles = {
  repositories: {
    marginTop: '32px'
  }
};

export default createReactClass({
  displayName: 'InfiniteScrollingList',

  propTypes: {
    title: PropTypes.func.isRequired,
    row: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    selectNextPage: PropTypes.func,
    refresh: PropTypes.func,
    selectOther: PropTypes.func,
    exclude: PropTypes.func
  },

  getDefaultProps() {
    return {
      exclude: function(model) {
        return false;
      }
    }
  },

  getInitialState() {
    return {
      other: null,
      pages: []
    };
  },

  // fetch first page
  componentWillMount() {
    const { select, selectOther } = this.props;
    const nextState = this.state;

    nextState.pages.push(select(getState));

    if (selectOther) {
      nextState.other = selectOther(getState);
    }

    this.setState(nextState);
  },

  // refresh data in all pages
  componentWillReceiveProps(nextProps) {
    const { refresh, selectOther } = this.props;
    const { pages } = this.state;
    const nextState = {};

    if (refresh) {
      nextState.pages = pages.map(function(page) {
        return refresh(page, getState);
      });
    }

    if (selectOther) {
      nextState.other = selectOther(getState);
    }

    this.setState(nextState);
  },

  onLoadMore() {
    const { selectNextPage } = this.props;
    const { pages } = this.state;
    const lastPage = pages[pages.length - 1];

    pages.push(selectNextPage(lastPage, getState));

    this.setState({
      pages: pages
    });
  },

  render() {
    const { title, row, exclude, selectNextPage } = this.props;
    const { pages, other } = this.state;
    const numberOfPages = pages.length;
    const firstPage = pages[0];
    const lastPage = pages[pages.length - 1];

    // if we only have one page, and it's fetching, then it's the initial
    // page load so let the user know we're loading the data
    if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
      return title(pages);
    }

    // If the last page has an error, replace the whole list with the error
    if(lastPage.state === PayloadStates.ERROR_FETCHING) {
      return title(pages);
    }

    return (
      <div>
        {title(pages)}
        <ul className="media-list" style={styles.repositories}>
          {_.flatten(pages.map((models) => {
            return _.filter(models.data, (model) => {
              return !exclude(model);
            }).map(row);
          }))}
        </ul>
        {selectNextPage ? (
          <LoadMoreButton
            lastPage={lastPage}
            onLoadMore={this.onLoadMore}
            nextPageMetaField="nextPage"
          />
        ) : null}
      </div>
    );
  }

});
