import React from 'react';

class Guessatron extends React.Component {

  getStyles() {
    return {
      media: {
        height: '64px',
        width: '64px',
        backgroundColor: '#00BFFF'
      }
    }
  }

  render() {
    const color = this.props.color;
    const styles = this.getStyles();

    return (
      <div>
        <h2>Guessatron Result</h2>
        <div className="media">
          <div className="media-left">
            <a href="#">
              <div className="media-object" style={styles.media} />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{color.data.name}</h4>
            <em>Is this your color?</em>
            <div>I hope it is because it's the only color I know.</div>
          </div>
        </div>
      </div>
    );
  }

}

Guessatron.propTypes = {
  color: React.PropTypes.object.isRequired
};

export default lore.connect(function(getState, props) {
  return {
    color: getState('color.byId', {
      id: props.params.colorId
    })
  }
})(Guessatron);
