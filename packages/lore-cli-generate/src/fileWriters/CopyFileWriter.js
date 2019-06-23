var _ = require('lodash');
var fs = require('fs-extra');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);
var writeFile = require('./writeFile');

/**
 * Copies a file to the target directory
 *
 * @param options
 * @returns Promise
 */
var CopyFileWriter = function(options) {
  this.options = options || {};
};

_.extend(CopyFileWriter.prototype, {

  write: function(source, target, options) {
    return readFile(source).then(function(data) {
      return writeFile(target, data, options);
    });
  }

});

module.exports = CopyFileWriter;
