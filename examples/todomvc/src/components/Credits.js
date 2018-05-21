import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({

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
