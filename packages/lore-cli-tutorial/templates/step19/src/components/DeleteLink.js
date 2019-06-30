import React from 'react';
import PropTypes from 'prop-types';

class DeleteLink extends React.Component {

  constructor(props) {
    super(props);
    this.onDestroy = this.onDestroy.bind(this);
  }

  getStyles() {
    return {
      link: {
        cursor: 'pointer',
        marginRight: '16px'
      }
    }
  }

  onDestroy() {
    const tweet = this.props.tweet;

    function destroyTweet() {
      lore.actions.tweet.destroy(tweet);
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.destroy({
        model: tweet,
        onSubmit: destroyTweet
      });
    });
  }

  render() {
    const styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onDestroy}>
        delete
      </a>
    );
  }

}

DeleteLink.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default DeleteLink;
