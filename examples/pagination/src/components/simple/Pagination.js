/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Router = require('react-router');

function link(text, enabled = true) {
  return {
    text: text,
    enabled: enabled
  }
}

module.exports = React.createClass({
  displayName: 'Pagination',

  getStyles: function() {
    return {
      pagination: {
        textAlign: 'center'
      }
    }
  },

  renderPaginationLink: function(pageNumber, currentPage) {
    if(pageNumber === currentPage) {
      return (
        <li key={pageNumber} className="active">
          <Router.Link to={{ pathname: '/', query: {page: pageNumber} }}>
            {pageNumber}
          </Router.Link>
        </li>
      )
    }

    return (
      <li key={pageNumber}>
        <Router.Link to={{ pathname: '/', query: {page: pageNumber} }}>
          {pageNumber}
        </Router.Link>
      </li>
    )
  },

  renderPreviousPageLink: function(currentPage) {
    var previousPage = currentPage - 1;

    if(currentPage === 1) {
      return (
        <li key="previous" className="disabled">
          <a>
            <span>&laquo;</span>
          </a>
        </li>
      );
    }

    return (
      <li key="previous">
        <Router.Link to={{ pathname: '/', query: { page: previousPage } }}>
          <span>&laquo;</span>
        </Router.Link>
      </li>
    );
  },

  renderNextPageLink: function(currentPage, totalPages) {
    var nextPage = currentPage + 1;

    if(currentPage === totalPages) {
      return (
        <li key="next" className="disabled">
          <a>
            <span>&raquo;</span>
          </a>
        </li>
      );
    }

    return (
      <li key="next">
        <Router.Link to={{ pathname: '/', query: { page: nextPage } }}>
          <span>&raquo;</span>
        </Router.Link>
      </li>
    );
  },

  renderDividerLink: function(key) {
    return (
      <li key={key}>
        <a>
          <span>...</span>
        </a>
      </li>
    );
  },

  renderPageLinks: function(currentPage, totalPages) {
    var links = [];

    if(currentPage < 3) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderPaginationLink(2, currentPage));
      links.push(this.renderPaginationLink(3, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else if(currentPage === 3) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderPaginationLink(2, currentPage));
      links.push(this.renderPaginationLink(3, currentPage));
      links.push(this.renderPaginationLink(4, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else if(currentPage === 4) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderPaginationLink(2, currentPage));
      links.push(this.renderPaginationLink(3, currentPage));
      links.push(this.renderPaginationLink(4, currentPage));
      links.push(this.renderPaginationLink(5, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else if(currentPage < totalPages - 3) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(currentPage -1, currentPage));
      links.push(this.renderPaginationLink(currentPage, currentPage));
      links.push(this.renderPaginationLink(currentPage + 1, currentPage));
      links.push(this.renderDividerLink('divider-2'));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else if(currentPage === totalPages - 3) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages - 4, currentPage));
      links.push(this.renderPaginationLink(totalPages - 3, currentPage));
      links.push(this.renderPaginationLink(totalPages - 2, currentPage));
      links.push(this.renderPaginationLink(totalPages - 1, currentPage));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else if(currentPage === totalPages - 2) {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages - 3, currentPage));
      links.push(this.renderPaginationLink(totalPages - 2, currentPage));
      links.push(this.renderPaginationLink(totalPages - 1, currentPage));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    } else {
      links.push(this.renderPaginationLink(1, currentPage));
      links.push(this.renderDividerLink('divider-1'));
      links.push(this.renderPaginationLink(totalPages - 2, currentPage));
      links.push(this.renderPaginationLink(totalPages - 1, currentPage));
      links.push(this.renderPaginationLink(totalPages, currentPage));
    }

    return links;
  },

  render: function() {
    var repositories = this.props.repositories;
    var reposPerPage = this.props.reposPerPage;
    var currentPage = Number(this.props.currentPage);
    var styles = this.getStyles();

    // Create pagination links
    var totalRepos = repositories.meta.totalCount;
    totalRepos = totalRepos > 1000 ? 1000 : totalRepos;
    var totalPages = Math.ceil(totalRepos/reposPerPage);

    var paginationLinks = this.renderPageLinks(currentPage, totalPages);

    return (
      <nav style={styles.pagination}>
        <ul className="pagination">
          {this.renderPreviousPageLink(currentPage)}
          {paginationLinks}
          {this.renderNextPageLink(currentPage, totalPages)}
        </ul>
      </nav>
    );
  }

});
