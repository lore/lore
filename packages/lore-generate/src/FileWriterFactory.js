var _ = require('lodash');
var CopyFileWriter = require('./fileWriters/CopyFileWriter');
var TemplateFileWriter = require('./fileWriters/TemplateFileWriter');

var FileWriterFactory = function() {
  // should logger be passed in constructor?
};

_.extend(FileWriterFactory.prototype, {

  createInstance: function(fileWriterType, options) {

    if (fileWriterType === 'copy') {
      return new CopyFileWriter(options);
    }

    if (fileWriterType === 'template') {
      return new TemplateFileWriter(options);
    }

    throw new Error('Unrecognized file type: ' + fileWriterType);
  }

});

module.exports = FileWriterFactory;
