var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: '<%= componentName %>',

  /**
   * This mixin provides a 'history' object on 'this'.
   * To navigate to a new route, call it like this:
   * this.history.pushState(null, '/the/new/url');
   *
   * Learn more at:
   * https://github.com/reactjs/react-router/blob/v1.0.3/docs/API.md#history-mixin
   */
  mixins: [Router.History],

  propTypes: {},

  render: function () {
    return (
      <div></div>
    );
  }
});
