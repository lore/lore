var path = require('path');
var camelCase = require('camel-case');
var Generator = require('@lore/cli-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname,'./templates'),

  // canBeUsedOutsideLoreProjects: true,

  after: function(options, targets) {
    var collectionName = options.collectionName;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new collection `' + collectionName + '` at `' + dest + '`');
  },

  targets: function(options) {
    var result = {};
    var filename = './src/collections/' + camelCase(options.collectionName) + '.js';

    if (options.es6 || options.esnext || true) {
      result[filename] = { copy: './collection.es6.js'};
    }

    return result;
  }

});
