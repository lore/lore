var React = require('react');
var Router = require('react-router');

module.exports = lore.connect(function(getState, props) {
    return {
      //models: getState('model.find')
    }
  },
  React.createClass({
    displayName: '<%= componentName %>',

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
