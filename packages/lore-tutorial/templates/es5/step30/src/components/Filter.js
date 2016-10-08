var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Filter',

  contextTypes: {
    user: React.PropTypes.object.isRequired
  },

  getStyles: function() {
    return {
      card: {
        marginTop: '20px'
      }
    }
  },

  render: function () {
    var user = this.context.user;
    var styles = this.getStyles();

    return (
      <div style={styles.card}>
        <ul className="list-group">
          <Router.IndexLink className="list-group-item" activeClassName="active" to="/">
            Feed
          </Router.IndexLink>
          <Router.Link className="list-group-item" activeClassName="active" to={"/users/" + user.id}>
            My Tweets
          </Router.Link>
        </ul>
      </div>
    );
  }
});
