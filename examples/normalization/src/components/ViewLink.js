import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';

export default withRouter(createReactClass({
  displayName: 'ViewLink',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  },

  onView: function() {
    const { tweet, router } = this.props;
    router.push('/tweets/' + tweet.id);
  },

  render: function() {
    return (
      <a className="link" onClick={this.onView}>
        view
      </a>
    );
  }

}));
