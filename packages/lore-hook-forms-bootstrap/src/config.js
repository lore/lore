var React = require('react');
var TextField = require('lore-react-forms-bootstrap/TextField');
// var CheckboxField = require('../lib/react-form-bootstrap/CheckboxField');
// var NumberField = require('../lib/react-form-bootstrap/NumberField');
var SelectField = require('lore-react-forms-bootstrap/SelectField');
var DynamicTextField = require('lore-react-forms-bootstrap/DynamicTextField');
var AutoCompleteField = require('lore-react-forms-bootstrap/AutoCompleteField');
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

    // text: function(name, attributes) {
    //   return (
    //     <TextField
    //       label={attributes.label}
    //       name={name}
    //       multiLine={true}
    //     />
    //   );
    // },
    //
    // checkbox: function(name, attributes) {
    //   return (
    //     <CheckboxField
    //       label={attributes.label}
    //       name={name}
    //     />
    //   );
    // },
    //
    // number: function(name, attributes) {
    //   return (
    //     <NumberField
    //       label={attributes.label}
    //       name={name}
    //     />
    //   );
    // },

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
        <button
          key={name}
          className="btn btn-default">
          {attributes.label || 'Cancel'}
        </button>
      );
    },

    submit: function(name, attributes, onSubmit) {
      return (
        <button
          key={name}
          className="btn btn-primary"
          onClick={onSubmit}>
          {attributes.label || 'Submit'}
        </button>
      );
    }

  }

};
