var React = require('react');
require('todomvc-common/base.css');
require('todomvc-app-css/index.css');

module.exports = lore.connect(function(getState, props){
    return {};
  }, {subscribe: true})(
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
