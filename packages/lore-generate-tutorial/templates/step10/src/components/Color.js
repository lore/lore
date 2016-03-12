var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Color',

  propTypes: {
    color: React.PropTypes.object.isRequired
  },

  render: function () {
    var color = this.props.color;

    return (
      <Router.Link
        to={'/colors/' + color.id}
        className="list-group-item"
        activeClassName="active">
        {color.data.name}
      </Router.Link>
    );
  }
});
