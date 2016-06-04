var Generator = require('./generator');

module.exports = {

  command: "collection",

  describe: "Generate a new collection",

  options: {
    params: '<collectionName>',

    options: {
      collectionName: {
        description: 'Name of the collection',
        type: 'string'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
