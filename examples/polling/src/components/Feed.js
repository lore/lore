import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../constants/PayloadStates';
import Tweet from './Tweet';

export default connect(function(getState, props){
  return {
    tweets: getState('tweet.findAll', {
      exclude: function(model) {
        return model.state === PayloadStates.DELETED;
      }
    })
  }
})(
createReactClass({
  displayName: 'Feed',

  propTypes: {
    tweets: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    // if the component was provided a query from lore.connect you
    // could start polling that same querying using this syntax:
    //
    // const tweets = this.props.tweets;
    // const query = tweets.query;
    // this.poll = lore.polling.tweet.find(query.where, query.pagination);
    // this.poll.start();

    // in this example, we have no query, so just invoke the action without arguments
    this.poll = lore.polling.tweet.find();
    this.poll.start();
  },

  componentWillUnmount: function() {
    this.poll.stop();
  },

  renderTweet: function(tweet) {
    return (
      <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
    );
  },

  render: function() {
    const { tweets } = this.props;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <h1 className="loading-text">
          Loading...
        </h1>
      )
    }

    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <ul className="media-list tweets">
          {tweets.data.map(this.renderTweet)}
        </ul>
      </div>
    );
  }
})
);
