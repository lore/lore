var React = require('react');
var DynamicTextField = require('lore-react-forms-material-ui').DynamicTextField;
var ConfigConnect = require('../ConfigConnect');
var Connect = null;

module.exports = function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.connect}>
      <DynamicTextField
        label={attributes.label}
        name={name}
        getMessage={attributes.getMessage}
      />
    </Connect>
  );
};
