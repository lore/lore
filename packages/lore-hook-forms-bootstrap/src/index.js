var React = require('react');
var _ = require('lodash');

module.exports = {

  dependencies: ['models'],

  defaults: {
    forms: require('./config')
  },

  load: function(lore) {
    var schemas = lore.loader.loadModels();

    lore.forms = {};

    _.mapKeys(schemas, function(schema, modelName) {
      lore.forms[modelName] = lore.forms[modelName] || {};

      lore.forms[modelName].create = function(props) {
        var Template = lore.config.forms.templates[props.template || 'default'];
        var templateProps = _.merge({}, schema.forms, props);
        return React.createElement(Template, templateProps);
      };

      lore.forms[modelName].update = function(model, props) {
        var Template = lore.config.forms.templates[props.template || 'default'];

        // get an object with all fields that will passed to the form
        var tempProps = _.merge({}, schema.forms, props);

        // populate the data attribute of each field with the model's data
        var modelFieldsData = {
          fields: _.mapValues(tempProps.fields, function (value, key) {
            return {
              data: model.data[key]
            };
          })
        };

        // create the final props for the template, overwriting the model data with provided data
        var templateProps = _.merge({}, schema.forms, modelFieldsData, props);
        return React.createElement(Template, templateProps);
      };
    });
  }

};
