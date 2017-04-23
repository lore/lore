var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;
var es5Targets = require('./targets/es5');
var es6Targets = require('./targets/es6');
var esnextTargets = require('./targets/esnext');

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
      targets = es5Targets;
      targets['./package-test.json'] = {
        json: JSON.stringify(options.packageJson, null, 2)
      };
      console.log('targets');
      console.log(targets);
      return targets;
    }
  }

});
