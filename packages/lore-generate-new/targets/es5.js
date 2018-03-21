var path = require('path');

function common(template) {
  return path.join('common', template);
}

function es5(template) {
  return path.join('es5', template);
}

function es6(template) {
  return path.join('es6', template);
}

module.exports = {

  // root
  './.babelrc': {copy: es6('babelrc')},
  './.editorconfig': {copy: common('editorconfig')},
  './.gitignore': {copy: common('gitignore')},
  './.lorerc': {copy: es5('lorerc')},
  './db.json': {copy: common('db.json')},
  './index.html': {copy: common('index.html')},
  './index.js': {copy: es6('index.js')},
  './package.json': {template: es5('package.json.njk')},
  './postcss.config.js': {copy: es6('postcss.config.js')},
  './README.md': {template: common('./README.md.njk')},
  './routes.js': {copy: es6('routes.js')},
  './webpack.config.js': {copy: es6('webpack.config.js')},

  // src
  './src/README.md': {copy: common('src/README.md')},

  // actions
  './src/actions/README.md': {copy: common('src/actions/README.md')},

  // collections
  './src/collections/README.md': {copy: common('src/collections/README.md')},

  // components
  './src/components/README.md': {copy: common('src/components/README.md')},
  './src/components/Layout.js': {copy: es5('src/components/Layout.js')},
  './src/components/Master.js': {copy: es5('src/components/Master.js')},
  './src/components/RemoveLoadingScreen.js': {copy: es5('src/components/RemoveLoadingScreen.js')},
  './src/components/ShowLoadingScreen.js': {copy: es5('src/components/ShowLoadingScreen.js')},

  // constants
  './src/constants/README.md': {copy: common('src/constants/README.md')},
  './src/constants/ActionTypes.js': {copy: es6('src/constants/ActionTypes.js')},
  './src/constants/PayloadStates.js': {copy: es6('src/constants/PayloadStates.js')},

  // decorators
  './src/decorators/README.md': {copy: common('src/decorators/README.md')},
  './src/decorators/UserIsAuthenticated.js': {copy: es6('src/decorators/UserIsAuthenticated.js')},
  './src/decorators/UserIsAuthorized.js': {copy: es6('src/decorators/UserIsAuthorized.js')},

  // dialogs
  './src/dialogs/.gitkeep': {copy: common('.gitkeep')},

  // forms
  './src/forms/.gitkeep': {copy: common('.gitkeep')},

  // mixins
  './src/mixins/.gitkeep': {copy: common('.gitkeep')},

  // models
  './src/models/README.md': {copy: common('src/models/README.md')},
  './src/models/currentUser.js': {copy: es6('src/models/currentUser.js')},

  // reducers
  './src/reducers/README.md': {copy: common('src/reducers/README.md')},

  // utils
  './src/utils/README.md': {copy: common('src/utils/README.md')},
  './src/utils/auth.js': {copy: es6('src/utils/auth.js')},
  './src/utils/storageAvailable.js': {copy: es6('src/utils/storageAvailable.js')},

  // config
  './config/actions.js': {copy: es6('config/actions.js')},
  './config/auth.js': {copy: es6('config/auth.js')},
  './config/collections.js': {copy: es6('config/collections.js')},
  './config/connections.js': {copy: es6('config/connections.js')},
  './config/connect.js': {copy: es6('config/connect.js')},
  './config/dialog.js': {copy: es6('config/dialog.js')},
  './config/local.js': {copy: es6('config/local.js')},
  './config/models.js': {copy: es6('config/models.js')},
  './config/react.js': {copy: es6('config/react.js')},
  './config/reducers.js': {copy: es6('config/reducers.js')},
  './config/redux.js': {copy: es6('config/redux.js')},
  './config/router.js': {copy: es6('config/router.js')},
  './config/README.md': {copy: common('config/README.md')},

  // config/env
  './config/env/development.js': {copy: es6('config/env/development.js')},
  './config/env/production.js': {copy: es6('config/env/production.js')},
  './config/env/README.md': {copy: common('config/env/README.md')},

  // initializers
  './initializers/REAMDE.md': {copy: common('initializers/README.md')},

  // assets
  './assets/REAMDE.md': {copy: common('assets/README.md')},
  './assets/css/main.css': {copy: common('assets/css/main.css')},
  './assets/images/favicon.png': {copy: common('assets/images/favicon.png')},
  './assets/images/logo.png': {copy: common('assets/images/logo.png')},
  './assets/less/main.less': {copy: common('assets/less/main.less')},
  './assets/sass/main.scss': {copy: common('assets/sass/main.scss')}

};
