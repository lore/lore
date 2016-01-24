var React = require('react');
require('todomvc-common/base.css');
require('todomvc-app-css/index.css');

module.exports = lore.connect({subscribe: true}, function(getState, props){
    return {};
  },
  React.createClass({
    displayName: 'Master',

    render: function() {
      return (
        <div>
          {React.cloneElement(this.props.children)}
        </div>
      );
    }
  })
);
