var path = require('path');

module.exports = {
  name: '<%= generatorName %>',
	moduleDir: path.resolve(__dirname, '..'),
	templatesDirectory: path.resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    return {
      // put files here that should be copied into the project
    };
  }
};
