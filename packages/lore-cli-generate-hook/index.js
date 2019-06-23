var Generator = require('./generator');

module.exports = {

  command: "hook",

  describe: "Generates a hook for Lore",

  options: {
    params: '<hookName>',

    options: {
      hookName: {
        hookName: 'Name of the hook',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
