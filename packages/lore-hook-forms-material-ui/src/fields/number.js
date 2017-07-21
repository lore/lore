var React = require('react');
var NumberField = require('lore-react-forms-material-ui').NumberField;

module.exports = function(name, attributes) {
  return (
    <NumberField
      label={attributes.label}
      name={name}
    />
  );
};
