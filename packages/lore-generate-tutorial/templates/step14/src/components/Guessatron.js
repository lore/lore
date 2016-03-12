var React = require('react');
var randomColor = require('randomcolor');

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
  var bragPhrases = [
    "I'm pretty sure I nailed it.",
    "Impressive right? Don't be shy. I know I'm awesome.",
    "YOU'RE WELCOME."
  ];
  return bragPhrases[getRandomInt(0,bragPhrases.length - 1)];
}

module.exports = lore.connect(function(getState, props) {
    return {
      color: getState('color.byId', {
        id: props.params.colorId
      })
    }
  },
  React.createClass({
    displayName: 'Guessatron',

    propTypes: {
      color: React.PropTypes.object.isRequired
    },

    render: function() {
      var color = this.props.color;
      var generatedColor = randomColor();
      var bragPhrase = getBragPhrase();

      return (
        <div>
          <h2>Guessatron Result</h2>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <div
                  className="media-object"
                  style={{height: '64px', width: '64px', backgroundColor: generatedColor}} />
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

  })
);
