var _ = require('lodash');
var fs = require('fs-extra');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);
var writeFile = require('./writeFile');

/**
 * Transforms a template and writes the result to the target directory
 *
 * @param options
 * @returns Promise
 */
var TemplateFileWriter = function(options) {
  this.options = options || {};
};

_.extend(TemplateFileWriter.prototype, {

  write: function(source, target, options) {
    return readFile(source, 'utf8').then(function(template) {
      var compiled = _.template(template);
      var data = compiled(options);

      if (!options.escapeHTMLEntities) {
        data = _.unescape(data);
      }

      return writeFile(target, data, options);
    });
  }

});

module.exports = TemplateFileWriter;
