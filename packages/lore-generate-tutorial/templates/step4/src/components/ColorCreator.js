var React = require('react');

var ENTER_KEY = 13;

module.exports = React.createClass({
  displayName: 'ColorCreator',

  propTypes: {
    colors: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      colors: {
        data: [
          {id: 1, data: {name: 'Red'}},
          {id: 2, data: {name: 'Green'}},
          {id: 3, data: {name: 'Blue'}}
        ]
      }
    };
  },

  getInitialState: function () {
    return {
      newColor: ''
    };
  },

  onChangeNewColor: function (event) {
    this.setState({
      newColor: event.target.value
    });
  },

  onKeyDownNewColor: function (event) {
    if (event.charCode !== ENTER_KEY) {
      return;
    }
    this.onCreateColor();
  },

  onCreateColor: function() {
    var value = this.state.newColor.trim();

    if (value) {
      console.log('Creating color: ' + value);

      this.setState({
        newColor: ''
      });
    }
  },

  renderColor: function(color) {
    return (
      <a key={color.id} className="list-group-item">
        {color.data.name}
      </a>
    );
  },

  render: function() {
    var colors = this.props.colors;

    return (
      <div>
        <h2>Color Requests</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What color should Guessatron display?"
            value={this.state.newColor}
            onKeyPress={this.onKeyDownNewColor}
            onChange={this.onChangeNewColor} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.onCreateColor}>
                  Create
                </button>
              </span>
        </div>
        <div className="list-group" style={{paddingTop: '16px'}}>
          {colors.data.map(this.renderColor)}
        </div>
      </div>
    );
  }

});
