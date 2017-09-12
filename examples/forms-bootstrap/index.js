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

// Summon the app!
lore.summon({
  hooks: {
    auth: require('/Users/jchansen/lore/lore/packages/lore-hook-auth'),
    actions: require('/Users/jchansen/lore/lore/packages/lore-hook-actions'),
    bindActions: require('/Users/jchansen/lore/lore/packages/lore-hook-bind-actions'),
    collections: require('/Users/jchansen/lore/lore/packages/lore-hook-collections'),
    connections: require('/Users/jchansen/lore/lore/packages/lore-hook-connections'),
    connect: require('/Users/jchansen/lore/lore/packages/lore-hook-connect'),
    dialog: require('/Users/jchansen/lore/lore/packages/lore-hook-dialog'),
    forms: require('/Users/jchansen/lore/lore/packages/lore-hook-forms-bootstrap'),
    models: require('/Users/jchansen/lore/lore/packages/lore-hook-models'),
    react: require('/Users/jchansen/lore/lore/packages/lore-hook-react'),
    reducers: require('/Users/jchansen/lore/lore/packages/lore-hook-reducers'),
    redux: _.extend(require('/Users/jchansen/lore/lore/packages/lore-hook-redux'), {
      dependencies: ['reducers', 'auth']
    }),
    router: require('/Users/jchansen/lore/lore/packages/lore-hook-router')
  }
});
