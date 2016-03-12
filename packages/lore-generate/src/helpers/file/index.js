var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');
var _ = require('lodash');

module.exports = function(options) {
  return Promise.resolve().then(function() {
    if (
      options.contents === void 0 ||
      options.rootPath === void 0
    ) {
      throw new Error('missing contents or rootPath options');
    }

    var rootPath = path.resolve(process.cwd(), options.rootPath);

    if (options.overwriteFiles) {
      return fs.outputFileAsync(rootPath, options.contents);
    } else {
      return fs.existsAsync(rootPath).then(function() {
        return fs.outputFileAsync(rootPath, options.contents)
      }).catch(function(err) {
        throw new Error('Something else already exists at ::' + rootPath);
      });
    }
  });
};
