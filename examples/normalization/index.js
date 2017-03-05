/**
* This file kicks off the build process for the application.  It also attaches
* the Lore singleton to the window, so you can access it from the command line
* in case you need to play with it or want to manually kick off actions or check
* the reducer state (through `lore.actions.xyz`, `lore.reducers.xyz`,
* `lore.models.xyz`, etc.)
**/

var lore = require('lore');
var _ = require('lodash');

// Allows you to access your lore app globally as well as from within
// the console. Remove this line if you don't want to be able to do that.
window.lore = lore;

// Override lore.summon to use the new config/react file
lore.summon = function(configOverride) {
  this.build(configOverride);

  var config = this.config.react;
  var Root = config.getRootComponent(this);
  config.mount(Root, function() {
    // this.log.info('App summoned from lore!');
    this.isSummoned = true;
  }.bind(this));
}.bind(lore);

// Summon the app!
lore.summon({
  hooks: {
    auth: require('lore-hook-auth'),
    actions: require('./hooks/lore-hook-actions'),
    bindActions: require('lore-hook-bind-actions'),
    collections: require('lore-hook-collections'),
    connections: require('lore-hook-connections'),
    connect: require('./hooks/lore-hook-connect'),
    dialog: require('lore-hook-dialog'),
    dialogs: require('./hooks/lore-hook-dialogs-bootstrap'),
    models: require('lore-hook-models'),
    reducers: require('lore-hook-reducers'),
    router: require('./hooks/lore-hook-router'),
    redux: _.extend(require('./hooks/lore-hook-redux'), {
      dependencies: ['reducers', 'auth']
    })
  }
});
