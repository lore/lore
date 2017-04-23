var Generator = require('./generator');

module.exports = {

  command: "update",

  describe: "Update an application to a newer version of Lore",

  options: {
    params: '<version>',

    options: {
      version: {
        description: 'Version to update to',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
