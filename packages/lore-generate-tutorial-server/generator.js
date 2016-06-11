var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;

/**
 * Helper function to reduce the repetitive paths for generating the server
 *
 * @param {Array} files List of server-related files to copy over
 * @returns {Object} List of files with modified paths
 */

function filesForServer(files) {
  var result = {};
  files.forEach(function(file) {
    var output = './' + file;
    result[output] = {
      copy: file
    };
  });
  return result;
}

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {
    options.appName = 'lore-tutorial-server';
    var appName = options.appName;

    // Make changes to the projectDirectory where the lore project will be created
    options.projectDirectory = path.resolve(options.projectDirectory, appName);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0) {
        throw new Error("Could not create tutorial server in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var appName = options.appName;
    this.logger.info('Created the tutorial server `' + appName + '`');
  },

  targets: function(options) {
    return filesForServer([
      'api/controllers/ColorController.js',
      'api/models/Color.js',
      'config/env/development.js',
      'config/env/production.js',
      'config/blueprints.js',
      'config/bootstrap.js',
      'config/connections.js',
      'config/cors.js',
      'config/csrf.js',
      'config/globals.js',
      'config/http.js',
      'config/i18n.js',
      'config/log.js',
      'config/models.js',
      'config/policies.js',
      'config/routes.js',
      'config/session.js',
      'config/sockets.js',
      'config/views.js',
      'views/403.ejs',
      'views/404.ejs',
      'views/500.ejs',
      'views/homepage.ejs',
      'views/layout.ejs',
      '.editorconfig',
      '.npmignore',
      '.sailsrc',
      'app.js',
      'package.json',
      'README.md'
    ]);
  }

});
