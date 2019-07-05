/*
 * This file kicks off the build process for the application.
 */


/*
 * Import the styles for the loading screen. We're doing that here to make
 * sure they get loaded regardless of the entry point for the application.
 */

import './assets/css/loading-screen.css';
import './assets/css/main.css';

/*
 * Environment
 */

import { getEnvironment } from './.lore/environment';

const environment = getEnvironment();


/*
 * Config
 */

import { getConfig } from './.lore/config';

const config = getConfig(environment);


/*
 * Models
 */

import { getModels } from './.lore/models';
import { getCollections } from './.lore/collections';

const models = getModels(config);
const collections = getCollections(config, models);


/*
 * Reducers
 *
 * Store application state. See redux.
 */

import { getReducers } from './.lore/reducers';

const reducers = getReducers(config);


/*
 * Actions
 *
 * Invoke models to make API calls and dispatch resulting
 * actions to reducers for storage.
 */

import { getActions } from './.lore/actions';

const actions = getActions(config, {
  models,
  collections
});


/*
 * Auth
 *
 * Insert actions for fetching and updating current user, along with a
 * reducer to store the current user, and an entry in the reducerActionMap
 * to orchestrate between them.
 */

import { getUserActions, getUserReducer, getUserReducerActionMapEntry } from './.lore/auth';

reducers[config.auth.reducerName] = getUserReducer(config);
actions[config.auth.actionName] = getUserActions(config, { models, collections });
config.connect.reducerActionMap[config.auth.modelName] = getUserReducerActionMapEntry(config);


/*
 * Redux
 *
 * Create store, bind actions
 */

import { getStore } from './.lore/redux';

const store = getStore(config, { reducers });


/*
 * Bind actions to Redux store
 *
 * This makes it more convenient to call actions, as the actions
 * they dispatch will automatically be sent the the application's
 * data store.
 */

import { bindActionsToActionCreators } from '@lore/bind-actions';
const boundActions = bindActionsToActionCreators(actions, store);


/*
 * Load and run initializers
 */

import { getInitializers, runInitializers } from '@lore/initializers';
const initializers = getInitializers(config);
runInitializers(config, { initializers });


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
import routes from './routes';

const domElementId = 'root';

ReactDOM.render((
  <ConfigContext.Provider value={config}>
    <ActionsContext.Provider value={actions}>
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
    </ActionsContext.Provider>
  </ConfigContext.Provider>
), document.getElementById(domElementId));


/*
 * Optional: attach key values to the window, so you can access them from
 * the command line. Useful if you want to manually invoke actions or check
 * the reducer state.
 *
 * Examples:
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
