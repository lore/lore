var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname,'./templates'),

  installDependencies: function() {
    var logger = this.logger;

    return new Promise(function(resolve, reject) {
      logger.debug('Installing faux-server...');
      spawn('npm', [
        'install',
        'faux-server',
        '--save'
      ], {
        stdio: 'inherit'
      }).on('data', function(data) {
        logger.log(data);
      }).on('close', function(code) {
        if(code !== 0) {
          reject(code);
        } else {
          logger.debug('faux-server installed successfully');
          resolve();
        }
      });
    });
  },

  after: function(options, targets) {
    var modelName = options.modelName;
    var dest = targets[0].destination.relativePath;
    var logger = this.logger;

    return Promise.resolve()
      .then(this.installDependencies)
      .then(function() {
        logger.info('Created initializer for faux-server at `' + dest + '`');
      });

  },

  targets: {
    './initializers/faux-server.js': { copy: './faux-server.js'}
  }

});
