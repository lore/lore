var path = require('path');
var camelCase = require('camel-case');

module.exports = {

  name: 'lore-generate-collection',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var result = {};
    result['./src/collections/' + camelCase(scope.collectionName) + '.js'] = { copy: './collectionfile.js'};
    return result;
	}
};
