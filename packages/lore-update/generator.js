var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;
var es5Targets = require('./targets/es5');
var es6Targets = require('./targets/es6');
var esnextTargets = require('./targets/esnext');
var _ = require('lodash');

function updatePackageJson(packageJson) {
  packageJson.scripts = {
    "clean": "rimraf dist",
    "build": "npm run clean && webpack --env.prod",
    "build:prod": "npm run clean && webpack --env.prod -p",
    "start": "webpack-dev-server --history-api-fallback --env.dev --hot --port=3000",
    "server": "json-server --watch db.json --port=1337",
    "test": "echo \"Error: no test specified\" && exit 1"
  };

  return _.merge({}, packageJson, {
    "dependencies": {
      "lore": "~0.12.0-beta",
      "lore-auth": "~0.12.0-beta",
      "lore-hook-actions": "~0.12.0-beta",
      "lore-hook-auth": "~0.12.0-beta",
      "lore-hook-bind-actions": "~0.12.0-beta",
      "lore-hook-collections": "~0.12.0-beta",
      "lore-hook-connect": "~0.12.0-beta",
      "lore-hook-connections": "~0.12.0-beta",
      "lore-hook-dialog": "~0.12.0-beta",
      "lore-hook-models": "~0.12.0-beta",
      "lore-hook-reducers": "~0.12.0-beta",
      "lore-hook-react": "~0.12.0-beta",
      "lore-hook-redux": "~0.12.0-beta",
      "lore-hook-router": "~0.12.0-beta",
      "lore-utils": "~0.12.0-beta",
    }
  });
}

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {

    // Make changes to the projectDirectory where the lore project will be created
    options.projectDirectory = path.resolve(options.projectDirectory, '.');

    var packageJson = require(path.resolve(options.projectDirectory, 'package.json'));
    console.log(packageJson);
    options.appName = packageJson.name;
    options.packageJson = packageJson;

    // options.dependencies = JSON.stringify(packageJson.dependencies);
    // options.devDependencies = JSON.stringify(packageJson.devDependencies);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0 && !options.force) {
        throw new Error("Could not update the Lore app in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var version = options.version;
    this.logger.info('Updated the application to version `' + version + '`');
  },

  targets: function(options) {
    var targets = {};

    if (options.esnext) {
      return esnextTargets;
    } else if (options.es6) {
      return es6Targets;
    } else {
      return es5Targets;
    }
  }

});
