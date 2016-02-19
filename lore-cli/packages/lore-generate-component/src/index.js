var path = require('path');
var pascalCase = require('pascal-case');

module.exports = {

  name: 'lore-generate-component',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var result = {};
    result['./src/components/' + pascalCase(scope.componentName) + '.js'] = { copy: './componentfile.js'};
    return result;
  }
};
