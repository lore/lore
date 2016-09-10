var React = require('react');
var Create = require('./blueprints/Create');
var Update = require('./blueprints/Update');
var Destroy = require('./blueprints/Destroy');
var _ = require('lodash');

function getCreateDialog(defaults) {
  return function(props, options) {
    var params = _.assign(defaults, options);
    return React.createElement(
      Create(params), props
    );
  }
}

function getUpdateDialog(defaults) {
  return function(props, options) {
    var params = _.assign(defaults, options);
    return React.createElement(
      Update(params), props
    );
  }
}

function getDestroyDialog(defaults) {
  return function(props, options) {
    var params = _.assign(defaults, options);
    return React.createElement(
      Destroy(params), props
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
        title: 'Create ' + _.capitalize(modelName),
        cancelButtonText: 'Cancel',
        submitButtonText: 'Create',
        defaults: {}
      });

      lore.dialogs[modelName].update = getUpdateDialog({
        modelName: modelName,
        attributes: schema.attributes,
        title: 'Update ' + _.capitalize(modelName),
        cancelButtonText: 'Cancel',
        submitButtonText: 'Update',
        defaults: {}
      });

      lore.dialogs[modelName].destroy = getDestroyDialog({
        modelName: modelName,
        attributes: schema.attributes,
        title: 'Delete ' + _.capitalize(modelName),
        cancelButtonText: 'Cancel',
        submitButtonText: 'Delete',
        defaults: {}
      });
    });
  }

};
