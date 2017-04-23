var _ = require('lodash');
var fs = require('fs-extra');
var Promise = require('bluebird');
var readFile = Promise.promisify(fs.readFile);
var writeFile = require('./writeFile');

/**
 * Writes a JSON object to a file in the target directory
 *
 * @param options
 * @returns Promise
 */
var JsonFileWriter = function(options) {
  this.options = options || {};
};

_.extend(JsonFileWriter.prototype, {

  write: function(source, target, options, value) {
    // return writeFile(target, JSON.stringify(source, null, 2), options);
    console.log('JsonFileWriter: source');
    console.log(value);
    return writeFile(target, value, options);
  }

});

module.exports = JsonFileWriter;
