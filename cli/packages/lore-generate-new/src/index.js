var path = require('path');
var _ = require('lodash');

var lorerc = require('../templates/lorerc');

module.exports = {

  name: 'new',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: {

    './config': { folder: {}},
    './config/env': { folder: {}},

    './src': { folder: {}},
    './src/actions': { folder: {}},
    './src/collections': { folder: {}},
    './src/components': { folder: {}},
    './src/constants': { folder: {}},
    './src/dialogs': { folder: {}},
    './src/mixins': { folder: {}},
    './src/models': { folder: {}},
    './src/reducers': { folder: {}},

    './webpack': { folder: {}},
    './webpack/env': { folder: {}},

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
    './routes.js': { copy: 'routes.js'},

    './config/env/development.js': { copy: 'config/env/development.js'},
    './config/env/production.js': { copy: 'config/env/production.js'},

    './src/actions/.gitkeep': { copy: '.gitkeep'},
    './src/collections/.gitkeep': { copy: '.gitkeep'},
    './src/components/Master.js': { copy: 'src/components/Master.js'},
    './src/components/Home.js': { copy: 'src/components/Home.js'},
    './src/constants/ActionTypes.js': { copy: 'src/constants/ActionTypes.js'},
    './src/constants/PayloadStates.js': { copy: 'src/constants/PayloadStates.js'},
    './src/dialogs/.gitkeep': { copy: '.gitkeep'},
    './src/models/.gitkeep': { copy: '.gitkeep'},
    './src/reducers/.gitkeep': { copy: '.gitkeep'},

    './webpack/config.js': { copy: 'webpack/config.js'},
    './webpack/env/development.js': { copy: 'webpack/env/development.js'},
    './webpack/env/production.js': { copy: 'webpack/env/production.js'},

    './.editorconfig': { copy: 'editorconfig.template' },
		'./.gitignore': { copy: 'gitignore' },
    './.lorerc': { jsonfile: lorerc },
    './index.html': { copy: 'index.html' },
    './index.js': { copy: 'index.js' },
    './package.json': { template: 'package.json' },
    './README.md': { template: './README.md' },
    './server.js': { copy: 'server.js' },
    './webpack.config.js': { copy: 'webpack.config.js' }
	}
};
