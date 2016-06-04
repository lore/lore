var Generator = require('./generator');

module.exports = {

  command: "surge",

  describe: "Generate a gulp file for publishing your project to surge.sh",

  options: {
    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
