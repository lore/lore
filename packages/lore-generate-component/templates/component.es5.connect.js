var React = require('react');

module.exports = lore.connect(function(getState, props) {
    return {
      //models: getState('model.find')
    }
  })(
  React.createClass({
    displayName: '<%= componentName %>',

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
