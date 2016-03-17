var path = require('path');

module.exports = {
  name: 'lore-generate-generator',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    return {
      './src': { folder: {}},
      './src/before.js': { copy: 'src/before.js'},
      './src/index.js': { template: 'src/index.js'},
      './src/after.js': { copy: 'src/after.js'},

      './test': { folder: {}},
      './test/test.spec.js': { copy: 'test/test.spec.js'},

      './templates': { folder: {}},
      './templates/.gitkeep': { copy: '.gitkeep'},

      './README.md': { template: './README.md' },
      './package.json': { template: './package.json' }
    };
  }
};
