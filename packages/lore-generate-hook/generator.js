var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {
    var hookName = options.hookName;

    // Make changes to the rootPath where the generator will be created
    options.projectDirectory = path.resolve(options.projectDirectory, hookName);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0) {
        throw new Error("Could not create a new hook in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var hookName = options.hookName;
    this.logger.info('Created a new hook `' + hookName + '` at `./' + hookName + '`');
  },

  targets: function(options) {
    if (options.esnext) {
      return {
        './src/index.js': { copy: './es6/src/index.js'},
        './test/test.spec.js': { copy: './es6/test/test.spec.js'},
        './.babelrc': { template: './esnext/babelrc' },
        './package.json': { template: './esnext/package.json' },
        './README.md': { template: './common/README.md' }
      };
    } else if (options.es6) {
      return {
        './src/index.js': { copy: './es6/src/index.js'},
        './test/test.spec.js': { copy: './es6/test/test.spec.js'},
        './.babelrc': { template: './es6/babelrc' },
        './package.json': { template: './es6/package.json' },
        './README.md': { template: './common/README.md' }
      };
    } else {
      return {
        './src/index.js': { copy: './es5/src/index.js'},
        './test/test.spec.js': { copy: './es5/test/test.spec.js'},
        './package.json': { template: './es5/package.json' },
        './README.md': { template: './common/README.md' }
      };
    }
  }

});
