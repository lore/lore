var Generator = require('./generator');

module.exports = {

  command: "component",

  describe: "Generate a new component",

  options: {
    params: '<componentName>',

    options: {
      componentName: {
        description: 'Name of the component',
        type: 'string'
      },
      esnext: {
        alias: 'n',
        describe: 'Generate an ESNext version of the component'
      },
      es6: {
        alias: '6',
        describe: 'Generate an ES6 version of the component'
      },
      connect: {
        alias: 'c',
        describe: 'Wrap the component in the lore.connect decorator'
      },
      router: {
        alias: 'r',
        describe: 'Configure the component to use the router'
      }
    },

    handler: function(argv) {
      var generator = new Generator(argv);
      generator.generate(argv);
    }
  }

};
