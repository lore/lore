/*
 * This file is the entry point for the application and is responsible for building
 * and mounting the application.
 */


/*
 * Import the styles for the loading screen. We're doing that here to make
 * sure they get loaded regardless of the entry point for the application.
 */

import './assets/css/loading-screen.css';
import './assets/css/main.css';


/*
 * Environment
 *
 * Get the environment we should be using. This is controlled via the LORE_ENV environment
 * variable, and defaults to 'development' if not defined.
 */

import { getEnvironment } from './.lore/environment';

const environment = getEnvironment();


/*
 * Modules
 *
 * Import files from the project directories and convert them into objects where
 * the key is the name of the file. These objects will be used to set up the actions,
 * reducers, Redux store, and other parts of the application.
 *
 * The approach used below (require.context + regex) prevents us from needing to
 * explicitly import every file, which helps to reduce configuration errors related to
 * simple forgetfulness. Simply add a file to one of the imported directories, and it
 * will automatically be imported.
 *
 * The downside to this approach is that it's not easy to understand. So if you'd
 * prefer to use a more explicit (or selective) approach, feel free to build the objects
 * yourself and manually import/require all files as needed.
 */

import { getModuleFromContext, buildObjectFromContext } from '@lore/utils';

const modules = {
  config: {
    // Import all the *.js files in the root of /config, excluding local.js
    baseConfig: buildObjectFromContext(require.context(`./config`, false, /^(?!.*(?:local.js$)).*\.js$/)),

    // Import the environment config override from /config/env
    envConfig: require(`./config/env/${environment || 'development'}`).default,

    // Import the local.js file in the root of /config, but ONLY in development
    localConfig: environment === 'development' ?
      getModuleFromContext(require.context(`./config`, false, /local.js$/)) :
      undefined
  },

  // Import all the *.js files in /actions, including subfolders
  actions: buildObjectFromContext(require.context('./src/actions', true, /\.js$/)),

  // Import all the *.js files in the root of /collections
  collections: buildObjectFromContext(require.context('./src/collections', false, /\.js$/)),

  // Import all the *.js files in the root of  /models
  models: buildObjectFromContext(require.context('./src/models', false, /\.js$/)),

  // Import all the *.js files in /reducers, including subfolders
  reducers: buildObjectFromContext(require.context('./src/reducers', true, /\.js$/)),

  // Import all the *.js files in the root of /initializers
  initializers: buildObjectFromContext(require.context('./initializers', false, /\.js$/))
};


/*
 * Config
 *
 * Construct the final project config by combining the default/base config,
 * the environment specific overrides, and any local overrides defined in
 * config/local.js.
 */

import { getConfig } from './.lore/config';

const config = getConfig(modules.config);


/*
 * Models
 *
 * An AJAX abstraction that reduces the boilerplate associated with creating,
 * retrieving, updating, and deleting a single resource in a REST API.
 *
 * These are instances of Model from @lore/backbone.
 */

import { getModels } from './.lore/models';

const models = getModels(config, {
  models: modules.models
});


/*
 * Collections
 *
 * An AJAX abstraction that reduces the boilerplate associated with searching,
 * filtering, and paginating resources in a REST API.
 *
 * These are instances of Collection from @lore/backbone.
 */

import { getCollections } from './.lore/collections';

const collections = getCollections(config, { models }, {
  models: modules.models,
  collections: modules.collections
});


/*
 * Reducers
 *
 * A set of functions that specify how the application's state should
 * change in response to actions sent to the store.
 *
 * https://redux.js.org/basics/reducers
 */

import { getReducers } from './.lore/reducers';

const reducers = getReducers(config, {
  models: modules.models,
  reducers: modules.reducers
});


/*
 * Actions/Action Creators
 *
 * A set of functions that dispatch actions containing payloads of information
 * that describe state changes in the application.
 *
 * https://redux.js.org/basics/actions
 *
 * In our case, these functions invoke the models and collections created above
 * to communicate with the REST API(s), and emit actions that describe what's
 * happening (such as creating, updating, and fetching data).
 */

import { getActions } from './.lore/actions';

const actions = getActions(config, { models, collections }, {
  models: modules.models,
  actions: modules.actions
});


/*
 * Authentication
 *
 * Add actions and reducers that allow us to fetch and update the current user.
 */

import { getUserActions, getUserReducer, getUserReducerActionMapEntry } from './.lore/auth';

// 1. Insert actions for fetching and updating current user
actions[config.auth.actionName] = getUserActions(config, { models, collections }, {
  models: modules.models
});

// 2. Insert a reducer for storing the current user
reducers[config.auth.reducerName] = getUserReducer(config);

// 3. Add entry to reducerActionMap so we can retrieve the current user via @lore/connect
config.connect.reducerActionMap[config.auth.modelName] = getUserReducerActionMapEntry(config);


/*
 * Redux Store
 *
 * Responsible for storing and updating application state using the behavior defined
 * in the reducers.
 *
 * https://redux.js.org/basics/store
 */

import { getStore } from './.lore/redux';

const store = getStore(config, { reducers });


/*
 * Bind actions to the Redux Store
 *
 * Reduce the boilerplate associated with invoking action creators by creating
 * a version of them bound to the store. This makes it more convenient to call
 * them, as the actions they dispatch will automatically be sent the store.
 *
 * https://redux.js.org/api/bindactioncreators
 */

import { bindActionsToActionCreators } from '@lore/bind-actions';

const boundActions = bindActionsToActionCreators(actions, store);


/*
 * Run the initializers
 *
 * These are small functions that run before the application is mounted and
 * are primarily used to initialize libraries for analytics, error reporting,
 * support, etc.
 */

import { runInitializers } from './.lore/initializers';

runInitializers(config, {
  initializers: modules.initializers
});


/*
 * WebSockets
 *
 * Create WebSocket connections that will listen for events on
 * specified endpoints and dispatch those events to the Redux store.
 */

import { getWebSocketConnections } from '@lore/websockets-sails';

const webSocketConnections = getWebSocketConnections(config, { models, store });


/*
 * React
 *
 * Establish the root component and render it to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfigContext } from '@lore/config';
import { ConnectProvider } from '@lore/connect';
import { ActionsContext } from '@lore/actions';
import { WebSocketsContext } from '@lore/websockets-sails';
import routes from './routes';

const domElementId = 'root';

ReactDOM.render((
  <ConfigContext.Provider value={config}>
    <ActionsContext.Provider value={actions}>
      <WebSocketsContext.Provider value={webSocketConnections}>
        <ConnectProvider
          store={store}
          actions={actions}
          blueprints={config.connect.blueprints}
          reducerActionMap={config.connect.reducerActionMap}
        >
          <BrowserRouter basename={__BASENAME__}>
            {routes}
          </BrowserRouter>
        </ConnectProvider>
      </WebSocketsContext.Provider>
    </ActionsContext.Provider>
  </ConfigContext.Provider>
), document.getElementById(domElementId));


/*
 * Globals (optional)
 *
 * Attach key values to the window, so you can access them from the console
 * in the browser. Use within the application is discouraged, but they can
 * sometimes improve the developer experience by allowing you to manually
 * invoke action creators, check the store state, or just play around with
 * project libraries.
 *
 * Example commands:
 *
 * lore.actions.xyz()          => invoke the xyz action
 * lore.store.getState().xyz   => check the state of xyz reducer
 * new lore.models.xyz()       => create instance of xyz model
 * new lore.collections.xyz()  => create instance of xyz collection
 */

window.lore = {
  environment: environment,
  config: config,
  models: models,
  collections: collections,
  actions: boundActions,
  store: store
};
