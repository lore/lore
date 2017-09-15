import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

class Feed extends React.Component {

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

Feed.propTypes = {
  tweets: PropTypes.object.isRequired
};

export default lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  }
})(Feed);
