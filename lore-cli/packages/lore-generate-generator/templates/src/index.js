var path = require('path');

module.exports = {

  name: '<%= generatorName %>',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    return {
      //'./LICENSE': { template: './LICENSE' },
      //'./README.md': { template: './README.md' },

      //'./src': { folder: {}},
      //'./src/before.js': { copy: 'src/before.js'},
      //'./src/index.js': { copy: 'src/index.js'},
      //'./src/after.js': { copy: 'src/after.js'},

      //'./templates': { folder: {}},

      // CUSTOM FILES GO BELOW
      // ex:
      //
      //
      // './templates': { folder: {}},
      // './templates/file.js': { copy: './templates/file.js'},
      // './templates/templatefile.js': { template: './templates/templatefile.js'},
      //
    };
  }
};
