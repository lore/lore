var React = require('react');
var AutoCompleteField = require('lore-react-forms-material-ui').AutoCompleteField;
var ConfigConnect = require('../ConfigConnect');
var Connect = null;

module.exports = function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.getOptions}>
      <AutoCompleteField
        label={attributes.label}
        name={name}
        field={attributes.field || 'username'}
      />
    </Connect>
  )
};
