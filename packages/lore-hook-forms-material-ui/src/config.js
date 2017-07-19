import React from 'react';
import mui from 'material-ui';
import {
  TextField,
  CheckboxField,
  NumberField,
  SelectField,
  DynamicTextField,
  AutoCompleteField
} from 'lore-react-forms-material-ui/TextField';
import Template from 'lore-react-forms/Template';
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
