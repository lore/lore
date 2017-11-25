var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {
    var generatorName = options.generatorName;

    // Make changes to the rootPath where the generator will be created
    options.projectDirectory = path.resolve(options.projectDirectory, generatorName);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0) {
        throw new Error("Could not create a new generator in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var generatorName = options.generatorName;
    this.logger.info('Created a new generator `' + generatorName + '` at `./' + generatorName + '`');
  },

  targets: {
    './generator.js': { copy: 'generator.js'},
    './index.js': { copy: 'index.js'},
    './package.json': { template: './package.json.njk' },
    './README.md': { template: './README.md.njk' },
    './test/test.spec.js': { copy: 'test/test.spec.js'},
    './templates/example.js': { copy: './templates/example.js'}
  }

});
