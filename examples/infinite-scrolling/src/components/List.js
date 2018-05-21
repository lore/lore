import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Repository from './Repository';
import RepositoryCount from './RepositoryCount';
import LoadMoreButton from './LoadMoreButton';

const QUERY = 'stars:>1000';
const SORT = 'stars';
const REPOS_PER_PAGE = 5;

export default connect(function(getState, props) {
    return {
      repositories: getState('repository.find', {
        where: {
          q: QUERY
        },
        pagination: {
          sort: SORT,
          per_page: REPOS_PER_PAGE,
          page: '1'
        }
      })
    }
  })(
  createReactClass({
    displayName: 'List',

    getStyles: function() {
      return {
        title: {
          textAlign: 'center'
        },
        loading: {
          textAlign: 'center',
          marginTop: '64px',
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'rgba(0,0,0,.54)'
        },
        repositories: {
          marginTop: '32px'
        }
      }
    },

    contextTypes: {
      store: PropTypes.object.isRequired
    },

    getInitialState: function() {
      const { repositories } = this.props;

      return {
        pages: [repositories]
      };
    },

    componentWillReceiveProps: function(nextProps) {
      const storeState = this.context.store.getState();
      const pages = this.state.pages;

      // Whenever the component re-renders, we need to rebuild our collection of pages
      // by fetching them back out of the Store. If we don't do this, our state data
      // will always be stale - we'll never know when data finishes being fetched, and
      // in the cases where some of the data is being modified, such as being updated
      // or deleted, we won't get a change to react to those changes and inform the user.
      const nextPages = pages.map(function(repositories) {
        const query = JSON.stringify(repositories.query);
        return storeState.repository.find[query];
      });

      this.setState({
        pages: nextPages
      });
    },

    onLoadMore: function() {
      const { pages } = this.state;
      const lastPage = pages[pages.length - 1];
      const nextPage = Number(lastPage.query.pagination.page) + 1;

      // The 'find' action has a slightly different interface than the 'getState' call
      // in 'lore.connect'. When calling the 'find' action directly, you need to pass
      // in the 'where' clause and the 'pagination' information as different arguments,
      // like 'lore.actions.repository.find(where, pagination)'
      const nextRepositoriesPage = lore.actions.repository.find({
        q: QUERY
      }, {
        sort: SORT,
        per_page: REPOS_PER_PAGE,
        page: nextPage
      }).payload;

      pages.push(nextRepositoriesPage);

      this.setState({
        pages: pages
      });
    },

    renderRepository: function(repository) {
      return (
        <Repository key={repository.id} repository={repository} />
      );
    },

    render: function() {
      const { pages } = this.state;
      const numberOfPages = pages.length;
      const lastPage = pages[pages.length - 1];

      const styles = this.getStyles();
      const title = 'Most Popular GitHub Repositories';

      // If we only have one page, we're loading the initial experience
      // so don't show the "load more" button
      if(numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
        return (
          <div>
            <h2 style={styles.title}>{title}</h2>
            <h2 style={styles.loading}>Loading...</h2>
          </div>
        );
      }

      // If the last page has an error, replace the whole list with the error
      if(lastPage.state === PayloadStates.ERROR_FETCHING) {
        return (
          <div>
            <h2 style={styles.title}>{title}</h2>
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

      // Convert the pages of repositories (basically an array of arrays) into
      // a flattened list of list items to be rendered
      const repositoryListItems = _.flatten(pages.map(function(repositories) {
        return repositories.data.map(this.renderRepository)
      }.bind(this)));

      return (
        <div>
          <h2 style={styles.title}>{title}</h2>
          <RepositoryCount pages={pages} />
          <ul className="media-list" style={styles.repositories}>
            {repositoryListItems}
          </ul>
          <LoadMoreButton lastPage={lastPage} onLoadMore={this.onLoadMore} />
        </div>
      );
    }

  })
);
