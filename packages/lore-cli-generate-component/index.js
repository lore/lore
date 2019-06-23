var Generator = require('./generator');

module.exports = {

  command: "component",

  describe: "Generate a new component",

  options: {
    params: '<componentName>',

    options: {
      componentName: {
        description: 'Name of the component',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
