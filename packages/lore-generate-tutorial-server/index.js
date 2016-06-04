var Generator = require('./generator');

module.exports = {

  command: "tutorial:server",

  describe: "Generates the API server for the Lore tutorial",

  options: {
    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
