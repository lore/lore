var React = require('react');
var Create = require('./blueprints/Create');
var Update = require('./blueprints/Update');
var Destroy = require('./blueprints/Destroy');

function getCreateDialog(defaults) {
  return function(props, options) {
    return React.createElement(
      Create({
        title: defaults.title,
        submitButtonText: defaults.submitButtonText,
        attributes: defaults.attributes,
        defaults: defaults.defaults,
        muiTheme: options.muiTheme
      }), props
    );
  }
}

function getUpdateDialog(defaults) {
  return function(props, options) {
    return React.createElement(
      Update({
        title: defaults.title,
        submitButtonText: defaults.submitButtonText,
        attributes: defaults.attributes,
        defaults: defaults.defaults,
        muiTheme: options.muiTheme
      }), props
    );
  }
}

function getDestroyDialog(defaults) {
  return function(props, options) {
    return React.createElement(
      Destroy({
        title: defaults.title,
        submitButtonText: defaults.submitButtonText,
        attributes: defaults.attributes,
        defaults: defaults.defaults,
        muiTheme: options.muiTheme
      }), props
    );
  }
}

module.exports = {

  dependencies: ['models'],

  load: function(lore) {
    var schemas = lore.loader.loadModels();

    lore.dialogs = {};

    _.mapKeys(schemas, function(schema, modelName) {
      lore.dialogs[modelName] = lore.dialogs[modelName] || {};

      lore.dialogs[modelName].create = getCreateDialog({
        modelName: modelName,
        attributes: schema.attributes,
        title: 'Create ' + modelName,
        submitButtonText: 'Create',
        defaults: {}
      });

      lore.dialogs[modelName].update = getUpdateDialog({
        modelName: modelName,
        attributes: schema.attributes,
        title: 'Update ' + modelName,
        submitButtonText: 'Update',
        defaults: {}
      });

      lore.dialogs[modelName].destroy = getDestroyDialog({
        modelName: modelName,
        attributes: schema.attributes,
        title: 'Delete ' + modelName,
        submitButtonText: 'Delete',
        defaults: {}
      });
    });
  }

};
