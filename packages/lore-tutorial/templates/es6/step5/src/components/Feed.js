import React from 'react';

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
      <li key={tweet.id}>
        {tweet.data.text}
      </li>
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
  tweets: React.PropTypes.object.isRequired
};

Feed.defaultProps = {
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

export default Feed;
