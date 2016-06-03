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
        'gulp-gh-pages@0.5.4',
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
    logger.info('Run `gulp github` to publish your project to GitHub Pages.');
    logger.info();
    logger.info('Note that unless you plan on using a custom domain, you will have to modify');
    logger.info('your index.html and routes.js files to prepend the name of your repository');
    logger.info('before your application will work correctly on GitHub Pages.');
    logger.info();
    logger.info('See the docs for additional information.');
  },

  after: function(options, targets) {
    var logger = this.logger;
    var dest = targets[0].destination.relativePath;

    return Promise.resolve()
      .then(this.installDependencies.bind(this))
      .then(this.displayUsageInstructions.bind(this))
      .then(function() {
        logger.info('Created gulp task for publishing to GitHub Pages `' + dest + '`. See usage instructions above.');
      });
  },

  targets: {
    './gulp/tasks/github.js': { copy: 'gulp/tasks/github.js'}
  }

});
