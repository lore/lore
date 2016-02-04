var _ = require('lodash');
var util = require('util');

function getDependencyVersion(packageJSON, module) {
  return (
    packageJSON.dependencies && packageJSON.dependencies[module] ||
    packageJSON.devDependencies && packageJSON.devDependencies[module] ||
    packageJSON.peerDependencies && packageJSON.peerDependencies[module] ||
    packageJSON.optionalDependencies && packageJSON.optionalDependencies[module]
  );
}

module.exports = function dataForPackageJSON(scope) {

  var lorePkg = scope.lorePackageJSON || {};

  var loreVersionDependency = (lorePkg.lore && lorePkg.lore.prerelease) || ('~' + lorePkg.version);

  // List default dependencies used for the frontend
  var dependenciesFrontend = {
    'classnames': getDependencyVersion(lorePkg, 'classnames'),
    'history': getDependencyVersion(lorePkg, 'history'),
    'invariant': getDependencyVersion(lorePkg, 'invariant'),
    'jquery': getDependencyVersion(lorePkg, 'jquery'),
    'lodash': getDependencyVersion(lorePkg, 'lodash'),
    'lore': loreVersionDependency,
    'moment': getDependencyVersion(lorePkg, 'moment'),
    'react': getDependencyVersion(lorePkg, 'react'),
    'react-dom': getDependencyVersion(lorePkg, 'react-dom'),
    'react-redux': getDependencyVersion(lorePkg, 'react-redux'),
    'react-router': getDependencyVersion(lorePkg, 'react-router'),
    'react-tap-event-plugin': getDependencyVersion(lorePkg, 'react-tap-event-plugin'),
    'redux': getDependencyVersion(lorePkg, 'redux'),
    'redux-thunk': getDependencyVersion(lorePkg, 'redux-thunk'),
    'require-dir': getDependencyVersion(lorePkg, 'require-dir')
  };

  // List default development dependencies used for build and testing
  var devDependenciesFrontend = {
    'babel-core': getDependencyVersion(lorePkg, 'babel-core'),
    'babel-loader': getDependencyVersion(lorePkg, 'babel-loader'),
    'bootstrap': getDependencyVersion(lorePkg, 'bootstrap'),
    'css-loader': getDependencyVersion(lorePkg, 'css-loader'),
    'file-loader': getDependencyVersion(lorePkg, 'file-loader'),
    'gulp': getDependencyVersion(lorePkg, 'gulp'),
    'gulp-clean': getDependencyVersion(lorePkg, 'gulp-clean'),
    'gulp-rename': getDependencyVersion(lorePkg, 'gulp-rename'),
    'gulp-sequence': getDependencyVersion(lorePkg, 'gulp-sequence'),
    'gulp-surge': getDependencyVersion(lorePkg, 'gulp-surge'),
    'gulp-util': getDependencyVersion(lorePkg, 'gulp-util'),
    'less': getDependencyVersion(lorePkg, 'less'),
    'less-loader': getDependencyVersion(lorePkg, 'less-loader'),
    'mocha': getDependencyVersion(lorePkg, 'mocha'),
    'normalize.css': getDependencyVersion(lorePkg, 'normalize.css'),
    'react-hot-loader': getDependencyVersion(lorePkg, 'react-hot-loader'),
    'redux-devtools': getDependencyVersion(lorePkg, 'redux-devtools'),
    'style-loader': getDependencyVersion(lorePkg, 'style-loader'),
    'surge': getDependencyVersion(lorePkg, 'surge'),
    'url-loader': getDependencyVersion(lorePkg, 'url-loader'),
    'webpack': getDependencyVersion(lorePkg, 'webpack'),
    'webpack-dev-server': getDependencyVersion(lorePkg, 'webpack-dev-server')
  };

  // Creating default package.json file content
  var defaultPackageJSONContent = {
    name: scope.appName,
    private: true,
    version: '0.0.0',
    description: 'a Lore application',
    keywords: [],
    dependencies: dependenciesFrontend,
    devDependencies: devDependenciesFrontend,
    scripts: {
      test: 'NODE_ENV=test mocha --recursive'
    },
    main: 'server.js',
    repository: {
      type: 'git',
      url: util.format('git://github.com/%s/%s.git', scope.github.username, scope.appName)
    },
    author: scope.author || '',
    license: ''
  };

  if (scope.packageJson && _.isObject(scope.packageJson)) {
    _.merge(defaultPackageJSONContent, (scope.packageJson || {}));
  }

  return _.defaults(scope.appPackageJSON || {}, defaultPackageJSONContent);
};

