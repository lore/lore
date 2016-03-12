var React = require('react');

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

      return (
        <div>
          <h2>Guessatron Result</h2>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <div
                  className="media-object"
                  style={{height: '64px', width: '64px', backgroundColor: '#00BFFF'}} />
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

  })
);
