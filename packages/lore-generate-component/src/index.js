var path = require('path');
var pascalCase = require('pascal-case');

module.exports = {

  name: 'lore-generate-component',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var isES5 = scope.options.indexOf('--es5') >= 0;
    var hasConnect = scope.options.indexOf('--connect') >= 0;
    var hasRouter = scope.options.indexOf('--router') >= 0;
    var template = './component';

    if (isES5) {
      template += '.es5'
    } else {
      template += '.es6'
    }

    if (hasConnect) {
      template += '.connect'
    }

    if (hasRouter) {
      template += '.router'
    }

    template += '.js';

    var result = {};
    var componentLocation = './src/components/' + pascalCase(scope.componentName) + '.js';
    result[componentLocation] = { template: template};
    return result;
  }
};
