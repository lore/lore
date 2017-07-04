import React from 'react';
import Template from 'lore-react-forms/Template';
import { TextField, SelectField, DynamicTextField, AutoCompleteField } from 'lore-react-forms-bootstrap';
import ConfigConnect from './ConfigConnect';

let Connect = null;

export default {

  templates: {
    default: Template,
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
      );
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
      );
    }

  },

  typeActionMap: {

    cancel: function(name, attributes) {
      return (
        <button
          key={name}
          className="btn btn-default"
        >
          {attributes.label || 'Cancel'}
        </button>
      );
    },

    submit: function(name, attributes, onSubmit) {
      return (
        <button
          key={name}
          className="btn btn-primary"
          onClick={onSubmit}
        >
          {attributes.label || 'Submit'}
        </button>
      );
    }

  }

};
