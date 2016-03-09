var React = require('react');
var Router = require('react-router');

module.exports = lore.connect(function(getState, props) {
    return {
      //models: getState('model.find')
    }
  },
  React.createClass({
    displayName: '<%= componentName %>',

    /**
     * This mixin provides a 'history' object on 'this'.
     * To navigate to a new route, call it like this:
     * this.history.pushState(null, '/the/new/url');
     *
     * Learn more about routing and the history object at:
     * https://github.com/reactjs/react-router/blob/v1.0.3/docs/API.md#history-mixin
     */
    mixins: [Router.History],

    propTypes: {
      //models: React.PropTypes.object.isRequired
    },

    render: function () {
      return (
        <div></div>
      );
    }
  })
);
