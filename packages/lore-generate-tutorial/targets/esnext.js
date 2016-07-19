var path = require('path');
var filesForStep = require('./filesForStep');

function common(template) {
  return path.join('common', template);
}

function es6(template) {
  return path.join('es6', template);
}

function esnext(template) {
  return path.join('esnext', template);
}

module.exports = function(options) {
  var files = filesForStep(options.step);

  switch(options.step) {
    case 'server':
      return files([
        'db.json',
        'config/models.js'
      ], es6);
    case 'step1':
      return files([
        'index.html'
      ], common);
    case 'step2':
      return files([
        'src/components/Header.js',
        'src/components/Layout.js'
      ], es6);
    case 'step3':
      return files([
        'src/components/ColorCreator.js',
        'src/components/Layout.js'
      ], esnext);
    case 'step4':
      return files([
        'src/components/ColorCreator.js'
      ], esnext);
    case 'step5':
      return files([
        'src/models/color.js'
      ], es6);
    case 'step6':
      return files([
        'src/components/ColorCreator.js'
      ], esnext);
    case 'step7':
      return files([
        'src/components/ColorCreator.js'
      ], esnext);
    case 'step8':
      return files([
        'src/components/ColorCreator.js'
      ], esnext);
    case 'step9':
      return files([
        'src/components/Color.js',
        'src/components/ColorCreator.js'
      ], esnext);
    case 'step10':
      return files([
        'src/components/Color.js',
        'src/components/Header.js'
      ], esnext);
    case 'step11':
      return files([
        'routes.js',
        'src/components/Guessatron.js',
        'src/components/Layout.js'
      ], esnext);
    case 'step12':
      return files([
        'src/components/Guessatron.js'
      ], esnext);
    case 'step13':
      return files([
        'src/components/Guessatron.js'
      ], esnext);
    case 'step14':
      return files([
        'src/components/Guessatron.js'
      ], esnext);
    default:
      return {};
  }
};
