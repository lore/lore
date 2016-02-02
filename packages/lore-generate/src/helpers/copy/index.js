var _ = require('lodash');
var Promise = require('bluebird');
var readFileAsync = Promise.promisify(require('fs-extra').readFile);
var path = require('path');
var FileHelper = require('../file');

module.exports = function(options) {
  var absSrcPath = path.resolve(options.templatesDirectory, options.templatePath);

  return readFileAsync(absSrcPath).then(function(contents) {
    return FileHelper(_.merge(options, {
      contents: contents
    }));
  });
};
