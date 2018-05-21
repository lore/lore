import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';

export default createReactClass({
  displayName: 'PaginationLink',

  propTypes: {
    page: PropTypes.number,
    text: PropTypes.string,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool
  },

  onClick: function(e) {
    e.preventDefault();
    this.props.onNavigate(this.props.page);
  },

  render: function() {
    const page = this.props.page;
    const text = this.props.text || page;
    const isDisabled = this.props.isDisabled;
    const isActive = this.props.isActive;

    if(isDisabled) {
      return (
        <li className="disabled">
          <a>
            <span dangerouslySetInnerHTML={{__html: text}} />
          </a>
        </li>
      );
    }

    if(isActive) {
      return(
        <li className="active">
          <a>
            <span dangerouslySetInnerHTML={{__html: text}} />
          </a>
        </li>
      );
    }

    return (
      <li>
        <Link to={{ pathname: '/', query: { page: page } }} onClick={this.onClick}>
          <span dangerouslySetInnerHTML={{__html: text}} />
        </Link>
      </li>
    );
  }

});
