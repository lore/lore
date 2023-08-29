var _ = require('lodash');
var path = require('path');
var nunjucks = require('nunjucks');
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
    // console.log(source);
    // console.log(options);

    var dirname = path.dirname(source);
    var basename = path.basename(source);

    nunjucks.configure(dirname);

    var data = nunjucks.render(basename, _.merge({}, options, {
      _: _
    }));

    return writeFile(target, data, options);
  }

});

module.exports = TemplateFileWriter;
