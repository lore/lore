var React = require('react');
var SelectField = require('lore-react-forms-material-ui').SelectField;
var ConfigConnect = require('../ConfigConnect');
var Connect = null;

module.exports = function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.getOptions}>
      <SelectField
        label={attributes.label}
        name={name}
        field={attributes.field || 'username'}
      />
    </Connect>
  )
};
