var _ = require('lodash');
var path = require('path');

var Target = function(src, dest, fileWriter, options) {
  this.source = src;
  this.destination = dest;
  this.fileWriter = fileWriter;
  this.options = options || {};
};

_.extend(Target.prototype, {

  write: function(options) {
    var source = path.resolve(this.source.rootPath, this.source.relativePath);
    var destination = path.resolve(this.destination.rootPath, this.destination.relativePath);
    return this.fileWriter.write(source, destination, options);
  }

});

module.exports = Target;
