var Promise = require('bluebird');
var fs = require('fs-extra');
var outputFile = Promise.promisify(fs.outputFile);
var exists = Promise.promisify(fs.exists);
var path = require('path');
var _ = require('lodash');

/**
 * Write a file to disk.
 *
 * @param options = {
 *   rootPath: '/Users/jchansen/my-app/src/models/post.js',
 *   data: 'file contents that should be written to disk',
 *   overwriteFiles: true || false
 * }
 * @returns {*}
 *
 * Usage:
 */
module.exports = function(file, data, options) {
  if (!file) {
    throw new Error('Missing required field `file`');
  }

  if (!data) {
    throw new Error('Missing required field `data`');
  }

  if (options.force) {
    return outputFile(file, data);
  }

  return exists(file).then(function() {
    return outputFile(file, data);
  }).catch(function(err) {
    throw new Error('Something else already exists at `' + file + '`');
  });
};
