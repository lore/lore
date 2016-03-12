var path = require('path');

module.exports = {

  name: 'lore-generate-component',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var isES6 = scope.options.indexOf('--es6') >= 0;
    var hasConnect = scope.options.indexOf('--connect') >= 0;
    var hasRouter = scope.options.indexOf('--router') >= 0;
    var template = './component';

    if (isES6) {
      template += '.es6'
    } else {
      template += '.es5'
    }

    if (hasConnect) {
      template += '.connect'
    }

    if (hasRouter) {
      template += '.router'
    }

    template += '.js';

    var result = {};
    var componentLocation = './src/components/' + scope.componentName + '.js';
    result[componentLocation] = { template: template};
    return result;
  }
};
