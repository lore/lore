var path = require('path');

module.exports = {

  name: 'lore-generate-generator',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: {
    './LICENSE': { template: './LICENSE' },
    './README.md': { template: './README.md' },
    './package.json': { template: './package.json' },

    './src': { folder: {}},
    './src/before.js': { copy: 'src/before.js'},
    './src/index.js': { template: 'src/index.js'},
    './src/after.js': { copy: 'src/after.js'},

    './templates': { folder: {}},
	}
};
