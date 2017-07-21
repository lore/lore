var React = require('react');
var TextField = require('lore-react-forms-material-ui').TextField;

module.exports = function(name, attributes) {
  return (
    <TextField
      label={attributes.label}
      name={name}
      multiLine={true}
    />
  );
};
