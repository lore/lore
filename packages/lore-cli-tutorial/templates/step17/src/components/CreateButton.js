import React from 'react';

export default class CreateButton extends React.Component {

  getStyles() {
    return {
      createButton: {
        position: 'absolute',
        top: '25px',
        right: '15px',
        zIndex: 1000,
        borderRadius: '100px',
        outline: 'none'
      }
    }
  }

  onClick() {
    function createTweet(params) {
      lore.actions.tweet.create(params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.tweet.create({
        onSubmit: createTweet
      });
    })
  }

  render() {
    const styles = this.getStyles();

    return (
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={styles.createButton}
        onClick={this.onClick}>
        +
      </button>
    );
  }

}
