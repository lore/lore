var React = require('react');

module.exports = React.createClass({
  displayName: 'Guessatron',

  propTypes: {
    color: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      color: {
        data: {
          name: 'DeepSkyBlue'
        }
      }
    }
  },

  getStyles: function() {
    return {
      media: {
        height: '64px',
        width: '64px',
        backgroundColor: '#00BFFF'
      }
    }
  },

  render: function() {
    var color = this.props.color;
    var styles = this.getStyles();

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

});
