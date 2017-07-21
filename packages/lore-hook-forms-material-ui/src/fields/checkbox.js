var React = require('react');
var CheckboxField = require('lore-react-forms-material-ui').CheckboxField;

module.exports = function(name, attributes) {
  return (
    <CheckboxField
      {...attributes}
      name={name}
    />
  );
};
