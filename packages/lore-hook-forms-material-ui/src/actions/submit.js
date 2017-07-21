var React = require('react');
var mui = require('material-ui');

module.exports = function(name, attributes, onSubmit) {
  return (
    <mui.FlatButton
      key={name}
      label={attributes.label || 'Submit'}
      primary={true}
      onTouchTap={onSubmit}
    />
  );
};
