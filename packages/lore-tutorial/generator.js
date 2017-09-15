var path = require('path');
var Generator = require('lore-generate').Generator;
var es6Targets = require('./targets/es6');
var esnextTargets = require('./targets/esnext');

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  before: function(options) {
    options.force = true;
  },

  after: function(options, targets) {
    var step = options.step;
    var logger = this.logger;

    targets.forEach(function(target) {
      var dest = target.destination.relativePath;
      logger.info('Added `' + dest + '`');
    });
    logger.info('Added all files for `' + step + '` of the tutorial');
  },

  targets: function(options) {
    if (options.esnext) {
      return esnextTargets(options);
    } else {
      return es6Targets(options);
    }
  }

});
