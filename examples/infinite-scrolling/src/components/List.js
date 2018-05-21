import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../constants/PayloadStates';
import InfiniteScrollingList from './InfiniteScrollingList';
import RepositoryCount from './RepositoryCount';
import Repository from './Repository';

const QUERY = 'stars:>1000';
const SORT = 'stars';
const REPOS_PER_PAGE = 5;

const styles = {
  title: {
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    marginTop: '64px',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.54)'
  }
};

export default createReactClass({
  displayName: 'List',

  render() {
    return (
      <InfiniteScrollingList
        title={(pages) => {
          const numberOfPages = pages.length;
          const lastPage = pages[pages.length - 1];
          const title = 'Most Popular GitHub Repositories';

          if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
            return (
              <div>
                <h2 style={styles.title}>
                  {title}
                </h2>
                <h2 style={styles.loading}>
                  Loading...
                </h2>
              </div>
            );
          }

          if (lastPage.state === PayloadStates.ERROR_FETCHING) {
            return (
              <div>
                <h2 style={styles.title}>
                  {title}
                </h2>
                <div>
                  <div>
                    <p>{lastPage.error.message}</p>
                  </div>
                  <div>
                    <p>Please see this link for more information:</p>
                    <p>
                      <a href={lastPage.error.documentation_url}>
                        {lastPage.error.documentation_url}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div>
              <h2 style={styles.title}>
                {title}
              </h2>
              <RepositoryCount pages={pages} />
            </div>
          );
        }}
        select={(getState) => {
          return getState('repository.find', {
            where: {
              q: QUERY
            },
            pagination: {
              sort: SORT,
              per_page: REPOS_PER_PAGE,
              page: '1'
            }
          })
        }}
        row={(repository) => {
          return (
            <Repository key={repository.id} repository={repository} />
          );
        }}
        refresh={(page, getState) => {
          return getState('repository.find', page.query);
        }}
        selectNextPage={(lastPage, getState) => {
          const lastPageNumber = Number(lastPage.query.pagination.page);

          return getState('repository.find', _.defaultsDeep({
            pagination: {
              page: lastPageNumber + 1
            }
          }, lastPage.query));
        }}
      />
    );
  }
});
