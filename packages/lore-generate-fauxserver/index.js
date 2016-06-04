var Generator = require('./generator');

module.exports = {

  command: "faux-server",

  describe: "Add initializer that redirects AJAX calls to localStorage to enable server-free development",

  options: {
    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
