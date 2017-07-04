/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import config from './config';

export default {

  dependencies: ['models'],

  defaults: {
    forms: config
  },

  load: function(lore) {
    const schemas = lore.loader.loadModels();

    lore.forms = {};

    _.mapKeys(schemas, function(schema, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      lore.forms[modelName].create = function(props) {
        const Template = lore.config.forms.templates[props.template || 'default'];
        const templateProps = _.merge({}, schema.forms, props);
        return React.createElement(Template, templateProps);
      };

      lore.forms[modelName].update = function(model, props) {
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
        return React.createElement(Template, templateProps);
      };
    });
  }

};
