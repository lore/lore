var filesForStep = require('./filesForStep');

/**
 * Take a command like "lore tutorial layout.3" and convert it into
 * a list of files that should be copied.
 *
 * templates/
 *   02.layout/
 *     step3/
 *       src/components/Layout.js
 */

module.exports = function(options) {

  // Split 'layout.3' into ['layout','3']
  const keys = options.step.split('.');

  // Get section name, e.g. 'layout'
  const section = keys[0];

  // Get step number, e.g. '3'
  const step = keys[1];

  const chapters = {
    setup:                '01.setup',
    layout:               '02.layout',
    routing:              '03.routing',
    data:                 '04.data',
    fetching:             '05.fetching',
    authentication:       '06.authentication',
    server:               '07.server',
    pagination:           '08.pagination',
    'infinite-scrolling': '09.infinite-scrolling',
    cleanup:              '10.cleanup',
    dialogs:              '11.dialogs',
    authorization:        '12.authorization',
    optimistic:           '13.optimistic',
    normalization:        '14.normalization',
    filtering:            '15.filtering',
    websockets:           '16.websockets',
    publishing:           '17.publishing'
  };

  // This will map templates into their subfolder
  var files = filesForStep(chapters[section], `step${step}`);

  // Get the list of files, prepended with their section folder
  switch(options.step) {
    case 'setup.4':
      return files([
        'db.json'
      ]);
    case 'layout.1':
      return files([
        'index.html'
      ]);
    case 'layout.2':
      return files([
        'assets/css/main.css'
      ]);
    case 'layout.3':
      return files([
        'src/components/Header.js',
        'src/components/Layout.js'
      ]);
    case 'routing.1':
      return files([
        'src/components/Header.js'
      ]);
    case 'routing.2':
      return files([
        'src/components/Feed.js',
        'src/components/Layout.js',
        'routes.js'
      ]);
    case 'data.1':
      return files([
        'src/components/Feed.js'
      ]);
    case 'data.2':
      return files([
        'src/components/Feed.js',
        'src/components/Tweet.js',
        'package.json'
      ]);
    case 'data.3':
      return files([
        'src/components/Tweet.js'
      ]);
    case 'fetching.1':
      return files([
        'config/connections.js'
      ]);
    case 'fetching.2':
      return files([
        'src/models/tweet.js'
      ]);
    case 'fetching.3':
      return files([
        'src/components/Feed.js',
      ]);
    case 'fetching.4':
      return files([
        'src/components/Feed.js',
      ]);
    case 'fetching.5':
      return files([
        'src/components/Feed.js',
        'src/components/Tweet.js',
        'src/models/user.js'
      ]);
    case 'authentication.1':
      return files([
        'src/components/Layout.js',
        'src/components/Profile.js'
      ]);
    case 'authentication.2':
      return files([
        'config/auth0.js',
        'package.json'
      ]);
    case 'authentication.3':
      return files([
        'src/components/Login.js',
        'routes.js'
      ]);
    case 'authentication.4':
      return files([
        'src/decorators/UserIsAuthenticated.js'
      ]);
    case 'authentication.5':
      return files([
        'src/components/AuthCallback.js',
        'routes.js'
      ]);
    case 'authentication.6':
      return files([
        'src/components/Logout.js',
        'src/components/Profile.js',
        'routes.js'
      ]);
    case 'authentication.7':
      return files([
        'src/models/currentUser.js',
        'db.json'
      ]);
    case 'authentication.8':
      return files([
        'src/components/Master.js',
        'src/components/Profile.js'
      ]);
    case 'server.2':
      return files([
        'config/collections.js'
      ]);
    case 'server.3':
      return files([
        'src/models/tweet.js'
      ]);
    case 'server.4':
      return files([
        'src/components/Master.js'
      ]);
    case 'server.5':
      return files([
        'config/connections.js'
      ]);
    case 'pagination.1':
      return files([
        'config/collections.js'
      ]);
    case 'pagination.2':
      return files([
        'src/components/Feed.js'
      ]);
    case 'pagination.3':
      return files([
        'src/components/Feed.js'
      ]);
    case 'pagination.4':
      return files([
        'src/components/Feed.js'
      ]);
    case 'infinite-scrolling.1':
      return files([
        'config/collections.js',
        'src/components/LoadMoreButton.js'
      ]);
    case 'infinite-scrolling.2':
      return files([
        'src/components/InfiniteScrollingList.js'
      ]);
    case 'infinite-scrolling.3':
      return files([
        'src/components/Feed.js'
      ]);
    case 'cleanup.1':
      return files([
        'src/components/Tweet.js',
        'src/models/tweet.js'
      ]);
    case 'dialogs.1':
      return files([
        'src/components/CreateButton.js',
        'src/components/Header.js'
      ]);
    case 'dialogs.2':
      return files([
        'src/components/CreateButton.js'
      ]);
    case 'dialogs.3':
      return files([
        'src/components/CreateButton.js',
        'src/dialogs/CreateTweetDialog.js'
      ]);
    case 'dialogs.4':
      return files([
        'config/dialogs.js',
        'src/dialogs/CreateTweetDialog.js',
        'src/dialogs/Dialog.js'
      ]);
    case 'dialogs.5':
      return files([
        'src/components/EditLink.js',
        'src/components/Tweet.js',
        'src/dialogs/UpdateTweetDialog.js'
      ]);
    case 'dialogs.6':
      return files([
        'src/components/DeleteLink.js',
        'src/components/Tweet.js',
        'src/dialogs/DeleteTweetDialog.js'
      ]);
    case 'authorization.1':
      return files([
        'src/components/Tweet.js',
      ]);
    case 'optimistic.1':
      return files([
        'src/components/Feed.js'
      ]);
    case 'optimistic.2':
      return files([
        'src/components/Feed.js'
      ]);
    case 'optimistic.3':
      return files([
        'src/components/Feed.js'
      ]);
    case 'optimistic.4':
      return files([
        'src/dialogs/CreateTweetDialog.js'
      ]);
    case 'optimistic.5':
      return files([
        'src/components/Tweet.js'
      ]);
    case 'optimistic.6':
      return files([
        'src/components/Feed.js'
      ]);
    case 'normalization.1':
      return files([
        'src/components/Feed.js',
        'src/models/tweet.js'
      ]);
    case 'filtering.1':
      return files([
        'src/components/Filter.js',
        'src/components/Layout.js'
      ]);
    case 'filtering.2':
      return files([
        'src/components/UserTweets.js',
        'routes.js'
      ]);
    case 'websockets.1':
      return files([
        'config/websockets.js',
        '.lore/websockets.js',
        'src/components/Master.js',
        'src/components/WebSockets.js',
        'index.js',
        'package.json'
      ]);
    case 'websockets.2':
      return files([
        'config/actions.js',
        'config/models.js',
        'package.json'
      ]);
    case 'publishing.3':
      return files([
        'config/env/production.js'
      ]);

    default:
      return {};
  }
};
