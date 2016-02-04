var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var util = require('util');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    var author = 'Storcery';
    var year = (new Date()).getFullYear();
    var username = scope.author;
    var args = scope.args;

    // CUSTOM VALIDATION LOGIC GOES HERE
    //
    // if (args.length === 0) {
    //    throw new Error('Missing required arguments.');
    // }
    //

    _.defaults(scope, {
      author: author,
      year: year,

      // ADD ANY CUSTOM ATTRIBUTES HERE
    });

    scope.rootPath = path.resolve(process.cwd(), appName || '');

    // NOTE: COMMENT BELOW OUT IF THIS GENERATOR IS NOT A FULL GENERATOR
    // The following prevents accidentally running a generator on top of another project.
    if(fs.existsSync(scope.rootPath)) {
      var files = fs.readdirSync(scope.rootPath);
      if (files.length > 0) {
        throw new Error('Couldn\'t create a new  in "'+scope.rootPath+'" (directory already exists and is not empty)');
      }
    }

  });
};
