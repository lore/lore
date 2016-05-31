var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;

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
      if (files.length > 0) {
        throw new Error("Could not create a new Lore app in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var appName = options.appName;
    this.logger.info('Created a new Lore application `' + appName + '`');
  },

  targets: {

    // root
    './.editorconfig': { copy: 'editorconfig.template' },
    './.gitignore': { copy: 'gitignore' },
    './index.html': { copy: 'index.html' },
    './index.js': { copy: 'index.js' },
    './.lorerc': { copy: 'lorerc' },
    './gulpfile.js': { copy: 'gulpfile.js' },
    './package.json': { template: 'package.json' },
    './README.md': { template: './README.md' },
    './routes.js': { copy: 'routes.js'},
    './server.js': { copy: 'server.js' },
    './webpack.config.js': { copy: 'webpack.config.js' },

    // webpack
    './webpack/config.js': { copy: 'webpack/config.js'},
    './webpack/README.md': { copy: 'webpack/README.md'},
    './webpack/env/development.js': { copy: 'webpack/env/development.js'},
    './webpack/env/production.js': { copy: 'webpack/env/production.js'},
    './webpack/env/README.md': { copy: 'webpack/env/README.md'},

    // src
    './src/README.md': { copy: 'src/README.md'},

    // actions
    './src/actions/README.md': { copy: 'src/actions/README.md'},

    // collections
    './src/collections/README.md': { copy: 'src/collections/README.md'},

    // components
    './src/components/README.md': { copy: 'src/components/README.md'},
    './src/components/Layout.js': { copy: 'src/components/Layout.js'},
    './src/components/Master.js': { copy: 'src/components/Master.js'},

    // constants
    './src/constants/README.md': { copy: 'src/constants/README.md'},
    './src/constants/ActionTypes.js': { copy: 'src/constants/ActionTypes.js'},
    './src/constants/PayloadStates.js': { copy: 'src/constants/PayloadStates.js'},

    // dialogs
    './src/dialogs/.gitkeep': { copy: '.gitkeep'},

    // mixins
    './src/mixins/.gitkeep': { copy: '.gitkeep'},

    // mixins
    './src/models/README.md': { copy: 'src/models/README.md'},

    // reducers
    './src/reducers/README.md': { copy: 'src/reducers/README.md'},

    // config
    './config/actionBlueprints.js': { copy: 'config/actionBlueprints.js'},
    './config/actions.js': { copy: 'config/actions.js'},
    './config/collections.js': { copy: 'config/collections.js'},
    './config/connect.js': { copy: 'config/connect.js'},
    './config/dialog.js': { copy: 'config/dialog.js'},
    './config/local.js': { copy: 'config/local.js'},
    './config/models.js': { copy: 'config/models.js'},
    './config/reducerActionMap.js': { copy: 'config/reducerActionMap.js'},
    './config/reducerBlueprints.js': { copy: 'config/reducerBlueprints.js'},
    './config/reducers.js': { copy: 'config/reducers.js'},
    './config/redux.js': { copy: 'config/redux.js'},
    './config/router.js': { copy: 'config/router.js'},
    './config/README.md': { copy: 'config/README.md'},

    // config/env
    './config/env/development.js': { copy: 'config/env/development.js'},
    './config/env/production.js': { copy: 'config/env/production.js'},
    './config/env/README.md': { copy: 'config/env/README.md'},

    // gulp
    './gulp/tasks/default.js': { copy: 'gulp/tasks/default.js'},
    './gulp/tasks/README.md': { copy: 'gulp/tasks/README.md'},

    // initializers
    './initializers/REAMDE.md': { copy: 'initializers/README.md'}

  }

});
