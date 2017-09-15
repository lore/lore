import React from 'react';
import PropTypes from 'prop-types';

class EditLink extends React.Component {

  static propTypes = {
    tweet: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  getStyles() {
    return {
      link: {
        cursor: 'pointer',
        marginRight: '16px'
      }
    }
  }

  onEdit() {
    const tweet = this.props.tweet;

    function updateTweet(params) {
      lore.actions.tweet.update(tweet, params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.update({
        model: tweet,
        onSubmit: updateTweet
      });
    });
  }

  render() {
    const styles = this.getStyles();

    return (
      <a style={styles.link} onClick={this.onEdit}>
        edit
      </a>
    );
  }

}

export default EditLink;
