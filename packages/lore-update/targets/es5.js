var path = require('path');

function common(template) {
  return path.join('common', template);
}

function es5(template) {
  return path.join('es5', template);
}

module.exports = {

  // root
  './index.html': {copy: common('index.html')},
  './index.js': {copy: es5('index.js')},
  './package.json': {template: es5('package.json')},
  // './package-test.json': {json: es5('package-test.json')},
  './postcss.config.js': {copy: es5('postcss.config.js')},
  './webpack.config.js': {copy: es5('webpack.config.js')},

  // config
  './config/actions.js': {copy: es5('config/actions.js')},
  './config/connect.js': {copy: es5('config/connect.js')},
  './config/react.js': {copy: es5('config/react.js')},
  './config/redux.js': {copy: es5('config/redux.js')},
  './config/router.js': {copy: es5('config/router.js')},

  // config/env
  './config/env/development.js': {copy: es5('config/env/development.js')}

};
