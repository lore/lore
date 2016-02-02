var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var _ = require('lodash');
var path = require('path');
var FileHelper = require('../file');

module.exports = function(options) {

  return Promise.resolve().then(function() {

    var absTemplatePath = path.resolve(options.templatesDirectory, options.templatePath);

    return fs.readFileAsync(absTemplatePath, 'utf8').then(function(contents) {
      contents = _.template(contents, options);

      if (!options.escapeHTMLEntities) {
        contents = _.unescape(contents);
      }

      return FileHelper(_.merge(options, {
        contents: contents
      }));
    });
  });
};
