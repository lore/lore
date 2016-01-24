'use strict';

var React = require('react');

module.exports = React.createClass({

  render: function () {
    return (
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          {"Modified version of the "}
          <a href="http://todomvc.com/examples/react" target="_blank">React TodoMVC example</a>
          {" created by "}
          <a href="http://github.com/petehunt" target="_blank">petehunt</a>
        </p>
      </footer>
    );
  }

});
