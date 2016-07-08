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

var REPOS_PER_PAGE = 10;

module.exports = lore.connect(function(getState, props) {
    return {
      posts: getState('repository.find', {
        where: {
          q: 'stars:>1000',
          sort: 'stars',
          per_page: REPOS_PER_PAGE,
          page: props.location.query.page || '1'
        }
      })
    }
  },
  React.createClass({
    displayName: 'List',

    getStyles: function() {
      return {
        repositories: {
          marginTop: '32px'
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

    renderPost: function(post) {
      var styles = this.getStyles();

      return (
        <li key={post.id} className="media" style={styles.repository.media}>
          <div className="media-left">
            <a href={post.data.html_url}>
              <img className="media-object" src={post.data.owner.avatar_url} style={styles.repository.image}/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <span className="badge pull-right">{post.data.stargazers_count}</span>
              {post.data.name}
            </h4>
            {post.data.description}
          </div>
        </li>
      );
    },

    render: function() {
      var posts = this.props.posts;
      var previousPosts = this.previousProps.posts;
      var styles = this.getStyles();
      var currentPage = this.props.location.query.page || '1';

      if (posts.state === PayloadStates.FETCHING) {
        return (
          <div>
            <h2>Loading...</h2>
          </div>
        );
      }

      return (
        <div>
          <h2>Most Popular GitHub Repositories</h2>
          <h4>With more than 1k stars</h4>
          <ul className="media-list" style={styles.repositories}>
            {posts.data.map(this.renderPost)}
          </ul>
          <Pagination
            repositories={posts}
            reposPerPage={REPOS_PER_PAGE}
            currentPage={currentPage} />
        </div>
      );
    }

  })
);
