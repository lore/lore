import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import PaginationLink from './PaginationLink';

export default createReactClass({
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
    const previousPage = currentPage - 1;

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
    const nextPage = currentPage + 1;

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
    const links = [];

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
    const repositories = this.props.repositories;
    const reposPerPage = this.props.reposPerPage;
    const currentPage = Number(this.props.currentPage);
    const styles = this.getStyles();

    // Create pagination links
    let totalRepos = repositories.meta.totalCount;
    totalRepos = totalRepos > 1000 ? 1000 : totalRepos;
    const totalPages = Math.ceil(totalRepos/reposPerPage);

    const paginationLinks = this.renderPageLinks(currentPage, totalPages);

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
