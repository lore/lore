/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import { Template as DefaultTemplate } from 'lore-react-forms';
import StringField from './fields/string';
import DynamicStringField from './fields/dynamicString';
import TextField from './fields/text';
import CheckboxField from './fields/checkbox';
import NumberField from './fields/number';
import SelectField from './fields/select';
import AutoCompleteField from './fields/autocomplete';
import CancelButton from './actions/cancel';
import SubmitButton from './actions/submit';

export default {

  dependencies: ['models'],

  defaults: {
    forms: {
      templates: {
        default: DefaultTemplate,
      },

      typeFieldMap: {
        string: StringField,
        dynamicString: DynamicStringField,
        text: TextField,
        checkbox: CheckboxField,
        number: NumberField,
        select: SelectField,
        autocomplete: AutoCompleteField
      },

      typeActionMap: {
        cancel: CancelButton,
        submit: SubmitButton
      }
    }
  },

  load: function(lore) {
    const schemas = lore.loader.loadModels();

    lore.forms = {};

    _.mapKeys(schemas, function(schema, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      lore.forms[modelName].create = function(props, options) {
        options = _.defaultsDeep({}, options, {
          fields: []
        });

        const Template = lore.config.forms.templates[props.template || 'default'];
        const templateProps = _.merge({}, schema.forms, props);

        if (options.fields.length > 0) {
          const allFields = templateProps.fields;
          templateProps.fields = {};
          options.fields.forEach(function(fieldName) {
            templateProps.fields[fieldName] = allFields[fieldName];
          });
        }

        return React.createElement(Template, templateProps);
      };

      lore.forms[modelName].update = function(model, props, options) {
        options = _.defaultsDeep({}, options, {
          fields: []
        });

        const Template = lore.config.forms.templates[props.template || 'default'];

        // get an object with all fields that will passed to the form
        const tempProps = _.merge({}, schema.forms, props);

        // populate the data attribute of each field with the model's data
        const modelFieldsData = {
          fields: _.mapValues(tempProps.fields, function (value, key) {
            return {
              data: model.data[key]
            };
          })
        };

        // create the final props for the template, overwriting the model data with provided data
        const templateProps = _.merge({}, schema.forms, modelFieldsData, props);

        if (options.fields.length > 0) {
          const allFields = templateProps.fields;
          templateProps.fields = {};
          options.fields.forEach(function(fieldName) {
            templateProps.fields[fieldName] = allFields[fieldName];
          });
        }

        return React.createElement(Template, templateProps);
      };
    });
  }

};
