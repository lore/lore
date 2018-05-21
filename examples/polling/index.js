/**
* This file kicks off the build process for the application.  It also attaches
* the Lore singleton to the window, so you can access it from the command line
* in case you need to play with it or want to manually kick off actions or check
* the reducer state (through `lore.actions.xyz`, `lore.reducers.xyz`,
* `lore.models.xyz`, etc.)
**/

import lore from 'lore';
import _ from 'lodash';

// Import the styles for the loading screen. We're doing that here to make
// sure they get loaded regardless of the entry point for the application.
import './assets/css/loading-screen.css';

// Allows you to access your lore app globally as well as from within
// the console. Remove this line if you don't want to be able to do that.
window.lore = lore;

// Hooks
import auth from 'lore-hook-auth';
import actions from 'lore-hook-actions';
import bindActions from 'lore-hook-bind-actions';
import collections from 'lore-hook-collections';
import connections from 'lore-hook-connections';
import connect from 'lore-hook-connect';
import dialog from 'lore-hook-dialog-bootstrap';
import dialogs from 'lore-hook-dialogs-bootstrap';
import models from 'lore-hook-models';
import polling from 'lore-hook-polling';
import react from 'lore-hook-react';
import reducers from 'lore-hook-reducers';
import redux from 'lore-hook-redux';
import router from 'lore-hook-router';

// Summon the app!
lore.summon({
  hooks: {
    auth,
    actions,
    bindActions,
    collections,
    connections,
    connect,
    dialog,
    dialogs,
    models,
    polling,
    react,
    reducers,
    redux: _.extend(redux, {
      dependencies: ['reducers', 'auth']
    }),
    router
  }
});
