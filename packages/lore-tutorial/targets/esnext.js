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
        'src/components/Header.js'
      ], es6);
    case 'step4':
      return files([
        'routes.js',
        'src/components/Feed.js',
        'src/components/Layout.js'
      ], es6);
    case 'step5':
      return files([
        'src/components/Feed.js'
      ], esnext);
    case 'step6':
      return files([
        'src/components/Feed.js',
        'src/components/Tweet.js'
      ], esnext);
    case 'step7':
      return files([
        'src/components/Tweet.js'
      ], esnext);
    case 'step8':
      return files([
        'config/models.js'
      ], es6);
    case 'step9':
      return files([
        'src/models/tweet.js'
      ], es6);
    case 'step10':
      return files([
        'src/components/Feed.js'
      ], esnext);
    case 'step11':
      return files([
        'config/collections.js'
      ], es6);
    case 'step12':
      return files([
        'src/components/Tweet.js',
        'src/models/user.js'
      ], esnext);
    case 'step13':
      return files([
        'src/components/Feed.js'
      ], esnext);
    case 'step14':
      return files([
        'src/components/CreateButton.js',
        'src/components/Header.js'
      ], es6);
    case 'step15':
      return files([
        'src/components/CreateButton.js',
        'src/components/CreateDialog.js'
      ], es6);
    case 'step16':
      return files([
        'index.js',
        'package.json',
        'src/components/CreateButton.js',
        'src/models/tweet.js'
      ], es6);
    case 'step17':
      return files([
        'src/components/CreateButton.js',
      ], es6);
    case 'step18':
      return files([
        'src/components/EditLink.js',
        'src/components/Tweet.js',
      ], esnext);
    case 'step19':
      return files([
        'src/components/DeleteLink.js',
        'src/components/Tweet.js',
      ], esnext);
    default:
      return {};
  }
};
