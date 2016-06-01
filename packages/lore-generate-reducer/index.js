var Generator = require('./generator');

module.exports = {

  command: "reducer",

  describe: "Generate a new reducer",

  options: {
    params: '<reducerName>',

    options: {
      reducerName: {
        description: 'Name of the reducer',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator();
      generator.generate(argv);
    }
  }

};
