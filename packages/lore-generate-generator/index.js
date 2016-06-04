var Generator = require('./generator');

module.exports = {

  command: "generator",

  describe: "Generate a new generator",

  options: {
    params: '<generatorName>',

    options: {
      generatorName: {
        description: 'Name of the generator',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
