/**
 * Configuration file for dialogs
 *
 * This file is where you define overrides for the default dialogs behavior.
 */
var React = require('react');
var TextField = require('lore-react-forms-material-ui/TextField');
var CheckboxField = require('lore-react-forms-material-ui/CheckboxField');
var NumberField = require('lore-react-forms-material-ui/NumberField');

module.exports = {

  typeFieldMap: {

    string: function(name, attributes) {
      return (
        <TextField
          label={attributes.label}
          name={name}
        />
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
    }

  }

};
