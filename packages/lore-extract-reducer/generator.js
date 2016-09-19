var path = require('path');
var camelCase = require('camel-case');
var Generator = require('lore-generate').Generator;


function getFilename(model, blueprint) {
  return './src/reducers/' + model + '/' + blueprint + '.js';
}

function getBlueprintPath(blueprint, options) {
  if (options.es6 || options.esnext) {
    return './es6/' + blueprint + '.js';
  } else {
    return './es5/' + blueprint + '.js';
  }
}

function getSingleBlueprint(model, blueprint, options, result) {
  result = result || {};
  result[getFilename(model, blueprint)] = { template: getBlueprintPath(blueprint, options) };
  return result;
}

function getAllBlueprints(model, options) {
  var result = {};
  getSingleBlueprint(model, 'byId', options, result);
  getSingleBlueprint(model, 'byCid', options, result);
  getSingleBlueprint(model, 'find', options, result);
  getSingleBlueprint(model, 'index', options, result);
  return result;
}

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  before: function(options) {
    var validBlueprints = ['byId', 'byCid', 'find', 'index'];

    var tokens = options.filename.split('/');
    if (tokens.length > 2) {
      throw new Error('Invalid format; filename must look like `model` or `model/blueprint`, e.g. `lore extract reducer post/byId`');
    }

    // set the modelName so the templates can write it into the file
    options.modelName = camelCase(tokens[0]);

    if (tokens.length > 1) {
      options.blueprintName = camelCase(tokens[1]);

      if (validBlueprints.indexOf(options.blueprintName) < 0) {
        throw new Error('Invalid blueprint "' + options.blueprintName + '"; must match one of ' + validBlueprints.join(', '));
      }
    }

    if (tokens.length > 1) {
      this.logger.info('Extracting `' + options.blueprintName + '` reducer for the `' + options.modelName + '` model...');
    } else {
      this.logger.info('Extracting all reducers for the `' + options.modelName + '` model...');
    }
  },

  after: function(options, targets) {
    targets.forEach(function(target) {
      this.logger.info('Extracted reducer to `' + target.destination.relativePath + '`');
    }.bind(this));
  },

  targets: function(options) {
    var modelName = options.modelName;
    var blueprintName = options.blueprintName;

    if (blueprintName) {
      return getSingleBlueprint(modelName, blueprintName, options);
    } else {
      return getAllBlueprints(modelName, options);
    }
  }

});
