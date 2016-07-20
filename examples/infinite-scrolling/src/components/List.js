var React = require('react');
var PayloadStates = require('../constants/PayloadStates');
var Repository = require('./Repository');
var RepositoryCount = require('./RepositoryCount');
var LoadMoreButton = require('./LoadMoreButton');

var QUERY = 'stars:>1000';
var SORT = 'stars';
var REPOS_PER_PAGE = 5;

module.exports = lore.connect(function(getState, props) {
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
  React.createClass({
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
      store: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        pages: [
          this.props.repositories
        ]
      };
    },

    componentWillReceiveProps: function(nextProps) {
      var storeState = this.context.store.getState();
      var pages = this.state.pages;

      // Whenever the component re-renders, we need to rebuild our collection of pages
      // by fetching them back out of the Store. If we don't do this, our state data
      // will always be stale - we'll never know when data finishes being fetched, and
      // in the cases where some of the data is being modified, such as being updated
      // or deleted, we won't get a change to react to those changes and inform the user.
      var nextPages = pages.map(function(repositories) {
        var query = JSON.stringify(repositories.query);
        return storeState.repository.find[query];
      });

      this.setState({
        pages: nextPages
      });
    },

    onLoadMore: function() {
      var pages = this.state.pages;
      var lastPage = pages[pages.length - 1];
      var nextPage = Number(lastPage.query.pagination.page) + 1;

      // The 'find' action has a slightly different interface than the 'getState' call
      // in 'lore.connect'. When calling the 'find' action directly, you need to pass
      // in the 'where' clause and the 'pagination' information as different arguments,
      // like 'lore.actions.repository.find(where, pagination)'
      var nextRepositoriesPage = lore.actions.repository.find({
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
      var pages = this.state.pages;
      var numberOfPages = pages.length;
      var lastPage = pages[pages.length - 1];

      var styles = this.getStyles();
      var title = 'Most Popular GitHub Repositories';

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
      var repositoryListItems = _.flatten(pages.map(function(repositories) {
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
