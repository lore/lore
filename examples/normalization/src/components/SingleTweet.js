import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Tweet from './Tweet';

export default connect(function(getState, props){
  return {
    tweet: getState('tweet.byId', {
      id: props.params.tweetId,
      query: {
        _expand: 'user'
      }
    })
  }
})(
createReactClass({
  displayName: 'SingleTweet',

  propTypes: {
    tweet: PropTypes.object.isRequired
  },

  render: function() {
    const { tweet } = this.props;

    if (tweet.state === PayloadStates.FETCHING) {
      return (
        <h1 className="loading-text">
          Loading...
        </h1>
      )
    }

    return (
      <div className="feed">
        <h2 className="title">
          Tweet
        </h2>
        <ul className="media-list tweets">
          <Tweet
            key={tweet.id || tweet.cid}
            tweet={tweet} />
        </ul>
      </div>
    );
  }
})
);
