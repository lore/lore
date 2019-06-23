var Generator = require('./generator');

module.exports = {

  command: "example",

  describe: "Generate an example file in src/examples",

  options: {
    params: '<filename>',

    options: {
      filename: {
        description: 'Name of the file',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
