var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var getRoot = require('./getRoot');

module.exports = function mount(store, routes, history, cb) {
  // Needed for onTouchTap
  // Can go away when react 1.0 release
  // Check this repo:
  // https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  const Root = getRoot(store, routes);

  ReactDOM.render(React.createElement(Root, {
    history: history
  }), document.getElementById('root'), cb);
};