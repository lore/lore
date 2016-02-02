var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var _ = require('lodash');
var path = require('path');

module.exports = function(options, handlers) {

  return Promise.resolve().then(function() {
    if (options.rootPath === void 0 ||
        options.data === void 0) {
      throw new Error('missing rootPath or data options');
    }

    var rootPath = path.resolve( process.cwd() , options.rootPath );

    return fs.existsAsync(rootPath).then(function(exists) {
      if (exists) {
        throw new Error('Something else already exists at ::' + rootPath);
      }

      return fs.outputJSONAsync(rootPath, options.data);
    });
	});
};
