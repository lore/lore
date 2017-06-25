var React = require('react');
var mui = require('material-ui');
var TextField = require('lore-react-forms-material-ui/TextField');
var CheckboxField = require('lore-react-forms-material-ui/CheckboxField');
var NumberField = require('lore-react-forms-material-ui/NumberField');
var SelectField = require('lore-react-forms-material-ui/SelectField');
var DynamicTextField = require('lore-react-forms-material-ui/DynamicTextField');
var AutoCompleteField = require('lore-react-forms-material-ui/AutoCompleteField');
var ConfigConnect = require('./ConfigConnect');
var Connect = null;

module.exports = {

  templates: {
    default: require('lore-react-forms/Template'),
  },

  typeFieldMap: {

    string: function(name, attributes) {
      return (
        <TextField
          label={attributes.label}
          name={name}
        />
      );
    },

    dynamicString: function(name, attributes) {
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
    },

    text: function(name, attributes) {
      return (
        <TextField
          label={attributes.label}
          name={name}
          multiLine={true}
        />
      );
    },

    checkbox: function(name, attributes) {
      return (
        <CheckboxField
          label={attributes.label}
          name={name}
        />
      );
    },

    number: function(name, attributes) {
      return (
        <NumberField
          label={attributes.label}
          name={name}
        />
      );
    },

    select: function(name, attributes) {
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
    },

    autocomplete: function(name, attributes) {
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
    }

  },

  typeActionMap: {

    cancel: function(name, attributes) {
      return (
        <mui.FlatButton
          key={name}
          label={attributes.label || 'Cancel'}
          onTouchTap={function() {}}
        />
      );
    },

    submit: function(name, attributes, onSubmit) {
      return (
        <mui.FlatButton
          key={name}
          label={attributes.label || 'Submit'}
          primary={true}
          onTouchTap={onSubmit}
        />
      );
    }

  }

};
