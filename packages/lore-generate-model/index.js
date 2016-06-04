var Generator = require('./generator');

module.exports = {

  command: "model",

  describe: "Generate a new model",

  options: {
    params: '<modelName>',

    options: {
      modelName: {
        description: 'Name of the model',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
