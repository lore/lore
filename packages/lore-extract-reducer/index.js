var Generator = require('./generator');

module.exports = {

  command: "reducer",

  describe: "Creates a reducer that mirrors the behavior of the corresponding blueprint in Lore",

  options: {
    params: '<filename>',

    options: {
      filename: {
        description: 'Name of the file(s) to extract, e.g. `post` or `post/byId`',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
