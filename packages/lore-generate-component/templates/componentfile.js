'use strict';

var React = require('react');
var Router = require('react-router');

module.exports = lore.connect(function(getState, props) {
    return {
      //todo: getState('todo.all', {
        //where: { }
      //})
    }
  },
  React.createClass({
    displayName: '<%= componentName %>',

    mixins: [Router.History],

    propTypes: {

    },

    render: function () {
      return (
        <div> </div>
      );
    }
  })
);
