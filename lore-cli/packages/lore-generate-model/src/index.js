var path = require('path');

module.exports = {

  name: 'lore-generate-model',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: {
    './src': { folder: {}},
    './src/before.js': { copy: 'src/before.js'},
    './src/index.js': { copy: 'src/index.js'},
    './src/after.js': { copy: 'src/after.js'},

    './templates': { folder: {}},

     './templates/file.js': { copy: './templates/modelfile.js'},
	}
};
