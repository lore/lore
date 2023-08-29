var Generator = require('./generator');

module.exports = {

  command: "action",

  describe: "Generate a new action",

  options: {
    params: '<actionName>',

    options: {
      actionName: {
        description: 'Name of the action',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
