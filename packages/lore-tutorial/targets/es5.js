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
    case 'server':
      return files([
        'db.json',
        'config/models.js'
      ], es5);
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
        'routes.js',
        'src/components/Feed.js',
        'src/components/Layout.js',
        'src/components/Tweet.js'
      ], es5);
    case 'step4':
      return files([
        'config/models.js',
        'src/models/tweet.js'
      ], es5);
    case 'step5':
      return files([
        'config/collections.js',
        'src/components/Feed.js'
      ], es5);
    case 'step6':
      return files([
        'src/components/Feed.js'
      ], es5);
    case 'step7':
      return files([
        'src/models/user.js',
        'src/components/Tweet.js'
      ], es5);
    case 'step8':
      return files([
        'src/components/CreateButton.js',
        'src/components/Header.js'
      ], es5);
    case 'step9':
      return files([
        'src/components/CreateButton.js',
        'src/dialogs/tweet/Create.js'
      ], es5);
    case 'step10':
      return files([
        'index.js',
        'package.json',
        'src/components/CreateButton.js',
        'src/models/tweet.js'
      ], es5);
    case 'step11':
      return files([
        'src/components/DeleteLink.js',
        'src/components/EditLink.js',
        'src/components/Tweet.js'
      ], es5);
    case 'step12':
      return files([
        'src/components/Layout.js',
        'src/components/Profile.js'
      ], es5);
    case 'step13':
      return files([
        'package.json',
        'routes.js',
        'config/auth0.js',
        'src/components/Login.js'
      ], es5);
    case 'step14':
      return files([
        'src/auth.js',
        'src/components/Login.js'
      ], es5);
    case 'step15':
      return files([
        'src/components/Login.js'
      ], es5);
    case 'step16':
      return files([
        'routes.js',
        'src/components/Logout.js',
        'src/components/Profile.js'
      ], es5);
    case 'step17':
      return files([
        'package.json',
        'routes.js',
        'src/decorators/UserIsAuthenticated.js'
      ], es5);
    case 'step18':
      return files([
        'src/components/Master.js',
      ], es5);
    case 'step19':
      return files([
        'src/actions/currentUser/get.js',
        'src/constants/ActionTypes.js',
        'src/models/currentUser.js',
      ], es5);
    case 'step20':
      return files([
        'config/collections.js',
        'config/models.js'
      ], es5);
    case 'step21':
      return files([
        'config/connect.js',
        'src/reducers/user/current.js'
      ], es5);
    case 'step22':
      return files([
        'src/components/Logout.js',
        'src/components/Profile.js'
      ], es5);
    case 'step23':
      return files([
        'src/components/EditLink.js',
        'src/decorators/UserCanEditTweet.js'
      ], es5);
    case 'step24':
      return files([
        'src/components/DeleteLink.js',
        'src/decorators/UserCanDeleteTweet.js',
      ], es5);
    case 'step25':
      return files([
        'src/components/CreateButton.js',
        'src/components/Feed.js'
      ], es5);
    case 'step26':
      return files([
        'config/collections.js',
        'src/components/Feed.js',
        'src/mixins/InfiniteScrolling.js',
      ], es5);
    case 'step27':
      return files([
        'src/components/Feed.js',
        'src/components/LoadMoreButton.js'
      ], es5);
    case 'step28':
      return files([
        'src/components/Feed.js'
      ], es5);
    case 'step29':
      return files([
        'src/components/Feed.js',
        'src/mixins/NewTweets.js'
      ], es5);
    case 'step30':
      return files([
        'src/components/Filter.js',
        'src/components/Layout.js'
      ], es5);
    case 'step31':
      return files([
        'routes.js',
        'src/components/UserTweets.js'
      ], es5);
    case 'step32':
      return files([
        'index.js',
        'package.json',
        'config/websockets.js',
        'src/components/Master.js'
      ], es5);
    case 'step33':
      return files([
        'config/actions.js',
      ], es5);
    default:
      return {};
  }
};
