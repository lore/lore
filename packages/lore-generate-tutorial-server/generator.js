var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;

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

  targets: {
    './api/controllers/ColorController.js': { copy: 'api/controllers/ColorController.js' },
    './api/models/Color.js': { copy: 'api/models/Color.js' },
    './config/env/development.js': { copy: 'config/env/development.js' },
    './config/env/production.js': { copy: 'config/env/production.js' },
    './config/blueprints.js': { copy: 'config/blueprints.js' },
    './config/bootstrap.js': { copy: 'config/bootstrap.js' },
    './config/connections.js': { copy: 'config/connections.js' },
    './config/cors.js': { copy: 'config/cors.js' },
    './config/csrf.js': { copy: 'config/csrf.js' },
    './config/globals.js': { copy: 'config/globals.js' },
    './config/http.js': { copy: 'config/http.js' },
    './config/i18n.js': { copy: 'config/i18n.js' },
    './config/log.js': { copy: 'config/log.js' },
    './config/models.js': { copy: 'config/models.js' },
    './config/policies.js': { copy: 'config/policies.js' },
    './config/routes.js': { copy: 'config/routes.js' },
    './config/session.js': { copy: 'config/session.js' },
    './config/sockets.js': { copy: 'config/sockets.js' },
    './config/views.js': { copy: 'config/views.js' },
    './views/403.ejs': { copy: 'views/403.ejs' },
    './views/404.ejs': { copy: 'views/404.ejs' },
    './views/500.ejs': { copy: 'views/500.ejs' },
    './views/homepage.ejs': { copy: 'views/homepage.ejs' },
    './views/layout.ejs': { copy: 'views/layout.ejs' },
    './.editorconfig': { copy: '.editorconfig' },
    './.gitignore': { copy: 'gitignore' },
    './.sailsrc': { copy: '.sailsrc' },
    './app.js': { copy: 'app.js' },
    './package.json': { copy: 'package.json' },
    './README.md': { copy: 'README.md' }
  }

});
