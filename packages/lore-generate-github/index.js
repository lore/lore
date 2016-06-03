var Generator = require('./generator');

module.exports = {

  command: "github",

  describe: "Generate a gulp file for publishing your project to GitHub Pages",

  options: {
    handler: function(argv) {
      var generator = new Generator();
      generator.generate(argv);
    }
  }

};
