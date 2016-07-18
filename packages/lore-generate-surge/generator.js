var path = require('path');
var Promise = require('bluebird');
var spawn = require('child_process').spawn;
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  installDependencies: function() {
    var logger = this.logger;

    return new Promise(function(resolve, reject) {
      logger.info('Installing dependencies...');
      spawn('npm', [
        'install',
        'gulp@3.9.1',
        'gulp-clean@0.3.1',
        'gulp-sequence@0.4.5',
        'gulp-surge@0.1.0',
        'gulp-util@3.0.7',
        '--save-dev'
      ], {
        stdio: 'inherit'
      }).on('data', function(data) {
        logger.info(data);
      }).on('close', function(code) {
        if(code !== 0) {
          reject(code);
        } else {
          logger.info('Dependencies installed successfully');
          resolve();
        }
      });
    });
  },

  displayUsageInstructions: function() {
    var logger = this.logger;

    logger.info();
    logger.info('Publishing Instructions');
    logger.info('-----------------------');
    logger.info('Run `gulp surge` to publish your project to surge.');
    logger.info();
    logger.info('The script will pause once you see this screen:');
    logger.info();
    logger.info('    Surge - surge.sh');
    logger.info();
    logger.info('    email: name@email.com');
    logger.info('    token: *****************');
    logger.info('    project path: /users/username/lore-project/tmp');
    logger.info('    size: 2 files, 2.3 MB');
    logger.info('    domain: frozen-tunda.surge.sh');
    logger.info();
    logger.info('To proceed, either hit enter to accept the randomly generated domain, or delete it and replace it with your own.');
    logger.info();
    logger.info('You can also set the domain your project is published to by running `gulp surge --domain=your-custom-subdomain.surge.sh`');
    logger.info('If you want to set a default domain the task always publishes to, modify `config.domain` in `gulp/tasks/surge.sh`');
    logger.info();
  },

  after: function(options, targets) {
    var logger = this.logger;
    var dest = targets[0].destination.relativePath;

    return Promise.resolve()
      .then(this.installDependencies.bind(this))
      .then(this.displayUsageInstructions.bind(this))
      .then(function() {
        logger.info('Created gulp task for publishing to surge.sh at `' + dest + '`. See usage instructions above.');
      });
  },

  targets: function(options) {
    if (options.es6 || options.esnext) {
      return {
        './gulp/tasks/surge.js': { copy: 'gulp/tasks/surge.es6.js'}
      };
    } else {
      return {
        './gulp/tasks/surge.js': { copy: 'gulp/tasks/surge.es5.js'}
      };
    }
  }

});
