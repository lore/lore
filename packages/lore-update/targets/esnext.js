var path = require('path');

function common(template) {
  return path.join('common', template);
}

function es6(template) {
  return path.join('es6', template);
}

function esnext(template) {
  return path.join('esnext', template);
}

module.exports = {

  // root
  './.babelrc': {copy: esnext('babelrc')},
  './index.html': {copy: common('index.html')},
  './index.js': {copy: es6('index.js')},
  './package.json': {template: es6('package.json.njk')},
  './postcss.config.js': {copy: es6('postcss.config.js')},
  './webpack.config.js': {copy: es6('webpack.config.js')},

  // config
  './config/actions.js': {copy: es6('config/actions.js')},
  './config/connect.js': {copy: es6('config/connect.js')},
  './config/react.js': {copy: es6('config/react.js')},
  './config/redux.js': {copy: es6('config/redux.js')},
  './config/router.js': {copy: es6('config/router.js')},

  // config/env
  './config/env/development.js': {copy: es6('config/env/development.js')}

};
