var path = require('path');
var camelCase = require('camel-case');

module.exports = {

  name: 'lore-generate-model',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var result = {};
    result['./src/models/' + camelCase(scope.modelName) + '.js'] = { copy: './modelfile.js'};
    return result;
	}
};
