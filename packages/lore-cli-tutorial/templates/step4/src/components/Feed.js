import React from 'react';

export default class Feed extends React.Component {

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

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <h2 style={styles.title}>
          Feed
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {/* Tweets */}
        </ul>
      </div>
    );
  }

}
