import React from 'react';
import CreateDialog from './CreateDialog';

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
    lore.dialog.show(function() {
      return (
        <CreateDialog/>
      );
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
