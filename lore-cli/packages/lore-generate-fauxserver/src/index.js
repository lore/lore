var path = require('path');

module.exports = {

  name: 'lore-generate-fauxserver',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var result = {};
    result['./initializers/fauxserver.js'] = { copy: './fauxserver.js'};
    return result;
  }
};
