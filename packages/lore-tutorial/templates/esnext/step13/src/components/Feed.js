import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';
import PayloadStates from '../constants/PayloadStates';

@lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  }
})
class Feed extends React.Component {

  static propTypes = {
    tweets: PropTypes.object.isRequired
  };

  getStyles() {
    return {
      title: {
        textAlign: 'center'
      },
      tweets: {
        marginTop: '32px'
      }
    }
  }

  renderTweet(tweet) {
    return (
      <Tweet key={tweet.id} tweet={tweet} />
    );
  }

  render() {
    const styles = this.getStyles();
    const tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <h1 className="loading-text">
          Loading...
        </h1>
      )
    }

    return (
      <div>
        <h2 style={styles.title}>
          Feed
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {tweets.data.map(this.renderTweet)}
        </ul>
      </div>
    );
  }

}

export default Feed;
