var path = require('path');
var Generator = require('@lore/cli-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname,'./templates'),

  after: function(options, targets) {
    var componentName = options.componentName;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new component `' + componentName + '` at `' + dest + '`');
  },

	targets: function(options) {
    var template = './component.js.njk';
    var result = {};
    var componentLocation = './src/components/' + options.componentName + '.js';
    result[componentLocation] = { template: template};
    return result;
  }

});
