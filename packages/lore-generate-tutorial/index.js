var Generator = require('./generator');

module.exports = {

  command: "tutorial",

  describe: "Generate files for the tutorial",

  options: {
    params: '<step>',

    options: {
      step: {
        description: 'Tutorial step to generate files for',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator();
      generator.generate(argv);
    }
  }

};
