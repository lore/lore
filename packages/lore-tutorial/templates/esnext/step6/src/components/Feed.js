import React from 'react';
import Tweet from './Tweet';

class Feed extends React.Component {

  static propTypes = {
    tweets: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    tweets: {
      state: 'RESOLVED',
      data: [{
        id: 1,
        cid: 'c1',
        state: 'RESOLVED',
        data: {
          id: 1,
          user: 1,
          text: 'Nothing can beat science!',
          createdAt: '2016-10-04T05:10:49.382Z'
        }
      }]
    }
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
