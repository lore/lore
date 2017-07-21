var React = require('react');
var mui = require('material-ui');

module.exports = function(name, attributes) {
  return (
    <mui.FlatButton
      key={name}
      label={attributes.label || 'Cancel'}
      onTouchTap={function() {}}
    />
  );
};
