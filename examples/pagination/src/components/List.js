/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Header = require('./Header');
var Router = require('react-router');
var PayloadStates = require('../constants/PayloadStates');
var Pagination = require('./Pagination');
var Repository = require('./Repository');

var REPOS_PER_PAGE = 10;

module.exports = lore.connect(function(getState, props) {
    return {
      repositories: getState('repository.find', {
        where: {
          q: 'stars:>1000'
        },
        pagination: {
          sort: 'stars',
          per_page: REPOS_PER_PAGE,
          page: props.location.query.page || '1'
        }
      })
    }
  })(
  Router.withRouter(React.createClass({
    displayName: 'List',

    getStyles: function(isLoading) {
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
          marginTop: '32px',
          opacity: isLoading ? '0.3' : '1'
        },
        repository: {
          media: {
            // border: '1px solid #ddd'
          },
          image: {
            width: '64px',
            height: '64px'
          }
        },
        pagination: {
          textAlign: 'center'
        }
      }
    },

    getInitialState: function() {
      return {
        previousRepositories: {
          state: PayloadStates.FETCHING
        }
      };
    },

    onNavigate: function(pageNumber) {
      this.setState({
        previousRepositories: this.props.repositories
      });

      this.props.router.push({
        pathname: '/',
        query: { page: pageNumber }
      });
    },

    renderRepository: function(repository) {
      return (
        <Repository key={repository.id} repository={repository} />
      );
    },

    render: function() {
      var repositories = this.props.repositories;
      var previousRepositories = this.state.previousRepositories;
      var isLoading = (repositories.state === PayloadStates.FETCHING);
      var styles = this.getStyles(isLoading);
      var currentPage = this.props.location.query.page || '1';
      var title = 'Most Popular GitHub Repositories';

      if (isLoading && previousRepositories.state === PayloadStates.FETCHING) {
        return (
          <div>
            <h2 style={styles.title}>{title}</h2>
            <h2 style={styles.loading}>Loading...</h2>
          </div>
        );
      }

      if (isLoading && previousRepositories.state === PayloadStates.RESOLVED) {
        repositories = previousRepositories;
      }

      if(repositories.state === PayloadStates.ERROR_FETCHING) {
        return (
          <div>
            <h2 style={styles.title}>{title}</h2>
            <div>
              <div>
                <p>{repositories.error.message}</p>
              </div>
              <div>
                <p>Please see this link for more information:</p>
                <p>
                  <a href={repositories.error.documentation_url}>
                    {repositories.error.documentation_url}
                  </a>
                </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <h2 style={styles.title}>{title}</h2>
          <ul className="media-list" style={styles.repositories}>
            {repositories.data.map(this.renderRepository)}
          </ul>
          <Pagination
            repositories={repositories}
            reposPerPage={REPOS_PER_PAGE}
            currentPage={currentPage}
            onNavigate={this.onNavigate} />
        </div>
      );
    }

  }))
);
