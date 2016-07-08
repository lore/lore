var React = require('react');
var Router = require('react-router');
var PaginationLink = require('./PaginationLink');

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
        <PaginationLink key={pageNumber} page={pageNumber} isActive={true} />
      );
    }

    return (
      <PaginationLink key={pageNumber} page={pageNumber} isActive={false} onNavigate={this.props.onNavigate}/>
    );
  },

  renderPreviousPageLink: function(currentPage) {
    var previousPage = currentPage - 1;

    if(currentPage === 1) {
      return (
        <PaginationLink key="previous" isDisabled={true} text={"&laquo;"} />
      );
    }

    return (
      <PaginationLink key="previous" page={previousPage} text={"&laquo;"} onNavigate={this.props.onNavigate}/>
    );
  },

  renderNextPageLink: function(currentPage, totalPages) {
    var nextPage = currentPage + 1;

    if(currentPage === totalPages) {
      return (
        <PaginationLink key="next" isDisabled={true} text={"&raquo;"} />
      );
    }

    return (
      <PaginationLink key="next" page={nextPage} text={"&raquo;"} onNavigate={this.props.onNavigate}/>
    );
  },

  renderDividerLink: function(key) {
    return (
      <PaginationLink key={key} text={'...'} isDisabled={true} />
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
