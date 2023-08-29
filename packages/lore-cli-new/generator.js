var path = require('path');
var fs = require('fs-extra');
var Generator = require('@lore/cli-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {
    var appName = options.appName;

    // Make changes to the projectDirectory where the lore project will be created
    options.projectDirectory = path.resolve(options.projectDirectory, appName);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0 && !options.force) {
        throw new Error("Could not create a new Lore app in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var appName = options.appName;
    this.logger.info('Created a new Lore application `' + appName + '`');
  },

  targets: function(options) {
    return {
      // root
      './.babelrc': { copy: 'babelrc' },
      './.editorconfig': { copy: 'editorconfig' },
      './.gitignore': { copy: 'gitignore' },
      './db.json': { copy: 'db.json' },
      './index.html': { copy: 'index.html' },
      './index.js': { copy: 'index.js' },
      './lore.config.js': { copy: 'lore.config.js' },
      './package.json': { template: 'package.json.njk' },
      './postcss.config.js': { copy: 'postcss.config.js' },
      './README.md': { template: './README.md.njk' },
      './routes.js': { copy: 'routes.js' },
      './webpack.config.js': { copy: 'webpack.config.js' },

      // lore
      './.lore/actions.js': { copy: 'lore/actions.js' },
      './.lore/auth.js': { copy: 'lore/auth.js' },
      './.lore/collections.js': { copy: 'lore/collections.js' },
      './.lore/config.js': { copy: 'lore/config.js' },
      './.lore/environment.js': { copy: 'lore/environment.js' },
      './.lore/initializers.js': { copy: 'lore/initializers.js' },
      './.lore/models.js': { copy: 'lore/models.js' },
      './.lore/reducers.js': { copy: 'lore/reducers.js' },
      './.lore/redux.js': { copy: 'lore/redux.js' },

      // now
      './.nowignore': { copy: 'nowignore' },
      './now.json': { template: 'now.json.njk' },

      // actions
      './src/actions/.gitkeep': { copy: 'gitkeep' },

      // collections
      './src/collections/.gitkeep': { copy: 'gitkeep' },

      // components
      './src/components/Layout.js': { copy: 'src/components/Layout.js' },
      './src/components/Master.js': { copy: 'src/components/Master.js' },
      './src/components/NotFound.js': { copy: 'src/components/NotFound.js' },
      './src/components/RemoveLoadingScreen.js': { copy: 'src/components/RemoveLoadingScreen.js' },
      './src/components/ShowLoadingScreen.js': { copy: 'src/components/ShowLoadingScreen.js' },

      // constants
      './src/constants/ActionTypes.js': { copy: 'src/constants/ActionTypes.js' },
      './src/constants/PayloadStates.js': { copy: 'src/constants/PayloadStates.js' },

      // decorators
      './src/decorators/UserIsAuthenticated.js': { copy: 'src/decorators/UserIsAuthenticated.js' },
      './src/decorators/UserIsAuthorized.js': { copy: 'src/decorators/UserIsAuthorized.js' },

      // dialogs
      './src/dialogs/.gitkeep': { copy: 'gitkeep' },

      // forms
      './src/forms/.gitkeep': { copy: 'gitkeep' },

      // models
      './src/models/currentUser.js': { copy: 'src/models/currentUser.js' },

      // reducers
      './src/reducers/.gitkeep': { copy: 'gitkeep' },

      // routes
      './src/routes/AuthenticatedRoute.js': { copy: 'src/routes/AuthenticatedRoute.js' },

      // utils
      './src/utils/auth.js': { copy: 'src/utils/auth.js' },
      './src/utils/storageAvailable.js': { copy: 'src/utils/storageAvailable.js' },

      // config
      './config/actions.js': { copy: 'config/actions.js' },
      './config/auth.js': { copy: 'config/auth.js' },
      './config/collections.js': { copy: 'config/collections.js' },
      './config/connect.js': { copy: 'config/connect.js' },
      './config/connectionMap.js': { copy: 'config/connectionMap.js' },
      './config/connections.js': { copy: 'config/connections.js' },
      './config/dialogs.js': { copy: 'config/dialogs.js' },
      './config/local.js': { copy: 'config/local.js' },
      './config/models.js': { copy: 'config/models.js' },
      // './config/react.js': { copy: 'config/react.js' },
      './config/reducers.js': { copy: 'config/reducers.js' },
      './config/redux.js': { copy: 'config/redux.js' },
      // './config/router.js': { copy: 'config/router.js' },

      // config/env
      './config/env/development.js': { copy: 'config/env/development.js' },
      './config/env/production.js': { copy: 'config/env/production.js' },

      // initializers
      './initializers/.gitkeep': { copy: 'gitkeep' },

      // assets
      './assets/css/loading-screen.css': { copy: 'assets/css/loading-screen.css' },
      './assets/css/main.css': { copy: 'assets/css/main.css' },
      './assets/images/favicon.png': { copy: 'assets/images/favicon.png' },
      './assets/images/logo.png': { copy: 'assets/images/logo.png' },
      './assets/less/loading-screen.less': { copy: 'assets/less/loading-screen.less' },
      './assets/less/main.less': { copy: 'assets/less/main.less' },
      './assets/sass/loading-screen.scss': { copy: 'assets/sass/loading-screen.scss' },
      './assets/sass/main.scss': { copy: 'assets/sass/main.scss' }
    }
  }

});
