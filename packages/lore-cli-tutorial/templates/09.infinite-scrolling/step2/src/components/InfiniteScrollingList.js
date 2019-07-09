import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useConnect } from '@lore/connect';
import PayloadStates from '../constants/PayloadStates';
import LoadMoreButton from './LoadMoreButton';

InfiniteScrollingList.propTypes = {
  row: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  selectNextPage: PropTypes.func,
  refresh: PropTypes.func,
  selectOther: PropTypes.func,
  exclude: PropTypes.func
};

InfiniteScrollingList.defaultProps = {
  exclude: function(model) {
    return false;
  }
};

export default function InfiniteScrollingList(props) {
  const {
    row,
    exclude,
    select,
    refresh,
    selectNextPage,
    selectOther
  } = props;

  const connect = useConnect();

  const [pages, setPages] = useState([select(connect)]);

  let _pages = pages;
  let _other = null;

  // refresh data in all pages
  if (refresh) {
    _pages = pages.map(function(page) {
      return refresh(page, connect);
    });
  }

  // select other data if provided
  if (selectOther) {
    _other = selectOther(connect);
  }

  const numberOfPages = _pages.length;
  const firstPage = _pages[0];
  const lastPage = _pages[_pages.length - 1];

  // if we only have one page, and it's fetching, then it's the initial
  // page load so let the user know we're loading the data
  if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
    return (
      <div className="loader" />
    );
  }

  function onLoadMore() {
    _pages.push(selectNextPage(lastPage, connect));
    setPages(_pages);
  }

  return (
    <div>
      <ul className="media-list tweets">
        {_other ? _other.data.map(row) : null}
        {_.flatten(_pages.map((models) => {
          return _.filter(models.data, (model) => {
            return !exclude(model);
          }).map(row);
        }))}
      </ul>
      {selectNextPage ? (
        <LoadMoreButton
          lastPage={lastPage}
          onLoadMore={onLoadMore}
          nextPageMetaField="nextPage"
        />
      ) : null}
    </div>
  );
}

