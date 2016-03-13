var path = require('path');
var _ = require('lodash');
var lorerc = require('../templates/lorerc');

module.exports = {

  name: 'new',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    return {

      './.editorconfig': { copy: 'editorconfig.template' },
      './.gitignore': { copy: 'gitignore' },
      './index.html': { copy: 'index.html' },
      './index.js': { copy: 'index.js' },
      './.lorerc': { jsonfile: lorerc },
      './gulpfile.js': { copy: 'gulpfile.js' },
      './package.json': { template: 'package.json' },
      './README.md': { template: './README.md' },
      './routes.js': { copy: 'routes.js'},
      './server.js': { copy: 'server.js' },
      './webpack.config.js': { copy: 'webpack.config.js' },

      './webpack': { folder: {}},
      './webpack/env': { folder: {}},
      './webpack/config.js': { copy: 'webpack/config.js'},
      './webpack/README.md': { copy: 'webpack/README.md'},
      './webpack/env/development.js': { copy: 'webpack/env/development.js'},
      './webpack/env/production.js': { copy: 'webpack/env/production.js'},
      './webpack/env/README.md': { copy: 'webpack/env/README.md'},

      './src': { folder: {}},
      './src/README.md': { copy: 'src/README.md'},

      './src/actions': { folder: {}},
      './src/actions/README.md': { copy: 'src/actions/README.md'},

      './src/collections': { folder: {}},
      './src/collections/README.md': { copy: 'src/collections/README.md'},

      './src/components': { folder: {}},
      './src/components/README.md': { copy: 'src/components/README.md'},
      './src/components/Layout.js': { copy: 'src/components/Layout.js'},
      './src/components/Master.js': { copy: 'src/components/Master.js'},

      './src/constants': { folder: {}},
      './src/constants/README.md': { copy: 'src/constants/README.md'},
      './src/constants/ActionTypes.js': { copy: 'src/constants/ActionTypes.js'},
      './src/constants/PayloadStates.js': { copy: 'src/constants/PayloadStates.js'},

      './src/dialogs': { folder: {}},
      './src/dialogs/.gitkeep': { copy: '.gitkeep'},

      './src/mixins': { folder: {}},
      './src/mixins/.gitkeep': { copy: '.gitkeep'},

      './src/models': { folder: {}},
      './src/models/README.md': { copy: 'src/models/README.md'},

      './src/reducers': { folder: {}},
      './src/reducers/README.md': { copy: 'src/reducers/README.md'},

      './config': { folder: {}},
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

      './config/env': { folder: {}},
      './config/env/development.js': { copy: 'config/env/development.js'},
      './config/env/production.js': { copy: 'config/env/production.js'},
      './config/env/README.md': { copy: 'config/env/README.md'},

      './gulp': { folder: {}},
      './gulp/tasks': { folder: {}},
      './gulp/tasks/default.js': { copy: 'gulp/tasks/default.js'},
      './gulp/tasks/README.md': { copy: 'gulp/tasks/README.md'},

      './initializers': { folder: {}},
      './initializers/REAMDE.md': { copy: 'initializers/README.md'}

    };
  }
};
