var path = require('path');

/**
 * Helper function to generate a file mapping between a given step
 * number and it's folder location in ../templates
 *
 * Example call:
 * filesForStep('step1')([
 *   'src/components/Header.js'
 * ])
 *
 * Returns:
 * {
 *   './src/components/Header.js': 'step1/src/components/Header.js'
 * }
 *
 * @param {String} step Name of the tutorial step, also name of folder
 * @returns {Function} Curry function taking an array of file names
 */
function filesForStep(step) {
  return function(files) {
    var result = {};
    files.forEach(function(file) {
      var output = './' + file;
      var target = step + '/' + file;
      result[output] = {
        copy: target
      };
    });
    return result;
  }
}

function filesForServer(files) {
  var result = {};
  files.forEach(function(file) {
    var output = './lore-tutorial-server/' + file;
    var target = 'server/' + file;
    result[output] = {
      copy: target
    };
  });
  return result;
}

module.exports = {

  name: 'lore-generate-tutorial',
	moduleDir: require('path').resolve(__dirname, '..'),
	templatesDirectory: require('path').resolve(__dirname,'../templates'),
	before: require('./before'),
	after: require('./after'),
	targets: function(scope) {
    var files = filesForStep(scope.step);

    switch(scope.step) {
      case 'step1':
        return files([
          'index.html'
        ]);
      case 'step2':
        return files([
          'src/components/Header.js',
          'src/components/Layout.js'
        ]);
      case 'step3':
        return files([
          'src/components/ColorCreator.js',
          'src/components/Layout.js'
        ]);
      case 'step4':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step5':
        return files([
          'src/models/color.js'
        ]);
      case 'step6':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step7':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step8':
        return files([
          'src/components/ColorCreator.js'
        ]);
      case 'step9':
        return files([
          'src/components/Color.js',
          'src/components/ColorCreator.js'
        ]);
      case 'step10':
        return files([
          'src/components/Color.js',
          'src/components/Header.js'
        ]);
      case 'step11':
        return files([
          'routes.js',
          'src/components/Guessatron.js',
          'src/components/Layout.js'
        ]);
      case 'step12':
        return files([
          'src/components/Guessatron.js'
        ]);
      case 'step13':
        return files([
          'src/components/Guessatron.js'
        ]);
      case 'step14':
        return files([
          'src/components/Guessatron.js'
        ]);
      case 'server':
        return filesForServer([
          'api/controllers/ColorController.js',
          'api/models/Color.js',
          'config/env/development.js',
          'config/env/production.js',
          'config/blueprints.js',
          'config/bootstrap.js',
          'config/connections.js',
          'config/cors.js',
          'config/csrf.js',
          'config/globals.js',
          'config/http.js',
          'config/i18n.js',
          'config/log.js',
          'config/models.js',
          'config/policies.js',
          'config/routes.js',
          'config/session.js',
          'config/sockets.js',
          'config/views.js',
          'views/403.ejs',
          'views/404.ejs',
          'views/500.ejs',
          'views/homepage.ejs',
          'views/layout.ejs',
          '.editorconfig',
          '.gitignore',
          '.sailsrc',
          'app.js',
          'package.json',
          'README.md'
        ]);
      default:
        return {};
    }
  }
};
