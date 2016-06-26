import React from 'react';
import randomColor from 'randomcolor';

/**
 * Returns a random integer between min and max
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a random bragging phase so the Guessatron can let
 * you know how awesome it is.
 */
function getBragPhrase() {
  const bragPhrases = [
    "Nailed it!",
    "I'm on fire.",
    "YOU'RE WELCOME.",
    "I interpret your silence as awe.",
    "Impressive, right?"
  ];
  return bragPhrases[getRandomInt(0,bragPhrases.length - 1)];
}

class Guessatron extends React.Component {

  getStyles() {
    return {
      media: {
        height: '64px',
        width: '64px',
        backgroundColor: randomColor()
      }
    }
  }

  render() {
    const color = this.props.color;
    const styles = this.getStyles();
    const bragPhrase = getBragPhrase();

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
            <div>{bragPhrase}</div>
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
  },
  Guessatron
);
