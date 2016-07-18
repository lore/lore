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
      },
      esnext: {
        alias: 'n',
        describe: 'Generate an ESNext version of the project'
      },
      es6: {
        alias: '6',
        describe: 'Generate an ES6 version of the project'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
