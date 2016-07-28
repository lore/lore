var React = require('react');
var Create = require('./blueprints/Create');
var Update = require('./blueprints/Update');
var Destroy = require('./blueprints/Destroy');

function getCreateDialog(options) {
  return function(props) {
    return React.createElement(
      Create({
        title: options.title,
        submitButtonText: options.submitButtonText,
        attributes: options.attributes,
        defaults: options.defaults
      }), props
    );
  }
}

function getUpdateDialog(options) {
  return function(props) {
    return React.createElement(
      Update({
        title: options.title,
        submitButtonText: options.submitButtonText,
        attributes: options.attributes,
        defaults: options.defaults
      }), props
    );
  }
}

function getDestroyDialog(options) {
  return function(props) {
    return React.createElement(
      Destroy({
        title: options.title,
        submitButtonText: options.submitButtonText,
        attributes: options.attributes,
        defaults: options.defaults
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
