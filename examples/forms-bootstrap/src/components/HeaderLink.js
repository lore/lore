var React = require('react');
var Router = require('react-router');

module.exports = Router.withRouter(React.createClass({
  displayName: 'HeaderLink',

  propTypes: {
    to: React.PropTypes.string.isRequired,
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    var router = this.props.router;
    var route = this.props.to;
    var className = router.isActive(route) ? "active" : "";

    return (
      <li className={className}>
        <Router.Link to={route}>
          {this.props.children}
        </Router.Link>
      </li>
    );
  }

}));
