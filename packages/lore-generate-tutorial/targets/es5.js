var path = require('path');
var filesForStep = require('./filesForStep');

function common(template) {
  return path.join('common', template);
}

function es5(template) {
  return path.join('es5', template);
}

module.exports = function(options) {
  var files = filesForStep(options.step);

  switch(options.step) {
    case 'step1':
      return files([
        'index.html'
      ], common);
    case 'step2':
      return files([
        'src/components/Header.js',
        'src/components/Layout.js'
      ], es5);
    case 'step3':
      return files([
        'src/components/ColorCreator.js',
        'src/components/Layout.js'
      ], es5);
    case 'step4':
      return files([
        'src/components/ColorCreator.js'
      ], es5);
    case 'step5':
      return files([
        'src/models/color.js'
      ], es5);
    case 'step6':
      return files([
        'src/components/ColorCreator.js'
      ], es5);
    case 'step7':
      return files([
        'src/components/ColorCreator.js'
      ], es5);
    case 'step8':
      return files([
        'src/components/ColorCreator.js'
      ], es5);
    case 'step9':
      return files([
        'src/components/Color.js',
        'src/components/ColorCreator.js'
      ], es5);
    case 'step10':
      return files([
        'src/components/Color.js',
        'src/components/Header.js'
      ], es5);
    case 'step11':
      return files([
        'routes.js',
        'src/components/Guessatron.js',
        'src/components/Layout.js'
      ], es5);
    case 'step12':
      return files([
        'src/components/Guessatron.js'
      ], es5);
    case 'step13':
      return files([
        'src/components/Guessatron.js'
      ], es5);
    case 'step14':
      return files([
        'src/components/Guessatron.js'
      ], es5);
    default:
      return {};
  }
};
