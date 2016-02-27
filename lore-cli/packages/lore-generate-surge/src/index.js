var path = require('path');

module.exports = {

  name: 'lore-generate-surge',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    return {
      './gulp/tasks/surge.js': { copy: 'gulp/tasks/surge.js'}
    };
  }
};
