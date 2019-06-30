var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var extend = require('./extend');
var FileWriterFactory = require('../FileWriterFactory');
var Target = require('../Target');
var fs = require('fs-extra');
var Logger = require('../Logger');
// var rc = require('rc');
var rc = require('@lore/cli-config');

/**
 * The Generator class constructor. Exposes the following fields for use:
 *
 * generator.generate
 *
 */
var Generator = function(options) {
  this.fileWriterFactory = new FileWriterFactory();
  this.logger = new Logger(options);
  this.lorerc = rc({
    generators: {
      language: "es5"
    }
  });
};

_.extend(Generator.prototype, {

  moduleRoot: null,

  templatesDirectory: './templates',

  canBeUsedOutsideLoreProjects: false,

  before: function(options) {},

  after: function(options) {},

  targets: function(options) {},

  getTemplatesDirectory: function() {
    if (path.isAbsolute(this.templatesDirectory)) {
      return this.templatesDirectory;
    }

    return path.resolve(this.moduleRoot, this.templatesDirectory);
  },

  getProjectDirectory: function() {
    return process.cwd();
  },

  isLoreProject: function(options) {
    var projectDirectory = options.projectDirectory;

    if (this.canBeUsedOutsideLoreProjects) {
      return true;
    }

    if(fs.existsSync(projectDirectory)) {
      var files = fs.readdirSync(projectDirectory);
      if (files.indexOf('lore.config.js') === -1) {
        throw new Error("This command can only be run inside a Lore project. The directory `" + projectDirectory + "` does not appear to be a Lore project.");
      }
    }
  },

  /**
   * Merge options.params into options and delete options.params. Params
   * was created by 'nested-args', but for now we're going to keep the
   * original 'yargs' interface and store everything in options.
   *
   * @param options
   */
  mergeParamsIntoOptions: function(options) {
    var params = options.params || {};
    Object.keys(params).forEach(function(param) {
      options[param] = params[param];
    });
    delete options['params'];
  },

  /**
   *
   * @param options
   * @returns {Array}
   */
  getTargets: function(options) {

    var fileWriterFactory = this.fileWriterFactory;
    var templatesDirectory = this.getTemplatesDirectory();
    var projectDirectory = options.projectDirectory;

    // Set the language the generator should use (globally set in .lorerc, can be overrideen by CLI arguments)
    var language = this.lorerc.generators.language;
    if (language === 'es6') {
      options.es6 = true;
    } else if (language === 'esnext') {
      options.esnext = true;
    }

    // The `targets` property can be an object or a function, so get the value accordingly
    var files = _.isPlainObject(this.targets) ? this.targets : this.targets(options);

    // Convert the files the generator should generate into a collection of Target instances
    // that know how to write themselves to disk
    //
    // Example: {
    //   './src/models/post.js': { copy: './model.js'}
    // }
    return Object.keys(files).map(function(destinationRelativePath) {
      var template = files[destinationRelativePath];

      var methodType = _.keys(template)[0];
      var sourceRelativePath = template[methodType];

      var fileWriter = fileWriterFactory.createInstance(methodType, options);

      var source = {
        rootPath: templatesDirectory,
        relativePath: sourceRelativePath
      };

      var destination = {
        rootPath: projectDirectory,
        relativePath: destinationRelativePath
      };

      return new Target(source, destination, fileWriter, options);
    });
  },

  /**
   * Generate all specified files
   */
  generate: function(options) {
    var that = this;
    var logger = this.logger;
    var targets = [];
    this.mergeParamsIntoOptions(options);
    options.projectDirectory = this.getProjectDirectory();

    // Write the files to disk
    return Promise.resolve().then(function() {
      return that.isLoreProject(options);
    }).then(function() {
      logger.debug('Running before()...');
      return that.before(options);
    }).then(function() {
      logger.debug('Generating targets...');

      // Get the list of file targets to generate
      targets = that.getTargets(options);

      return Promise.mapSeries(targets, function(target) {
        logger.debug('Writing target...');
        return target.write(options);
      });
    }).then(function() {
      logger.debug('Running after()...');
      return that.after(options, targets);
    }).catch(function(err) {
      logger.error(err.message);
    });
  }

});

// Set up inheritance for the generator
Generator.extend = extend;

module.exports = Generator;
