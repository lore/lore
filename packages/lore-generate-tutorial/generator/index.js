var path = require('path');
var Generator = require('lore-generate').Generator;
var filesForStep = require('./filesForStep');

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname, '..'),

  templatesDirectory: path.resolve(__dirname, '../templates'),

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
    var files = filesForStep(options.step);

    switch(options.step) {
      case 'step1':
        return files([
          'index.html'
        ]);
      case 'step2':
        return files([
          'src/components/Header.js',
          'src/components/Layout.js'
        ]);
      case 'step3':
        return files([
          'src/components/ColorCreator.js',
          'src/components/Layout.js'
        ]);
      case 'step4':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step5':
        return files([
          'src/models/color.js'
        ]);
      case 'step6':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step7':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step8':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step9':
        return files([
          'src/components/Color.js',
          'src/components/ColorCreator.js'
        ]);
      case 'step10':
        return files([
          'src/components/Color.js',
          'src/components/Header.js'
        ]);
      case 'step11':
        return files([
          'routes.js',
          'src/components/Guessatron.js',
          'src/components/Layout.js'
        ]);
      case 'step12':
        return files([
          'src/components/Guessatron.js'
        ]);
      case 'step13':
        return files([
          'src/components/Guessatron.js'
        ]);
      case 'step14':
        return files([
          'src/components/Guessatron.js'
        ]);
      default:
        return {};
    }
  }

});
