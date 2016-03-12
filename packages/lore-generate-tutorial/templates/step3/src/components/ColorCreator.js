var React = require('react');

module.exports = React.createClass({
  displayName: 'ColorCreator',

  propTypes: {
    colors: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      colors: {
        data: [
          {id: 1, cid: 'c1', data: {name: 'Red'}},
          {id: 2, cid: 'c2', data: {name: 'Green'}},
          {id: 3, cid: 'c3', data: {name: 'Blue'}}
        ]
      }
    };
  },

  renderColor: function(color) {
    return (
      <a key={color.id || color.cid} className="list-group-item">
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
            placeholder="What color should Guessatron display?" />
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
