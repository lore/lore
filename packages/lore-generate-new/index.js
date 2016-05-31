var Generator = require('./generator');

module.exports = {

  command: "new",

  describe: "Create a new application",

  options: {
    params: '<appName>',

    options: {
      appName: {
        description: 'Name of the application',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator();
      generator.generate(argv);
    }
  }

};
