/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default {

  dependencies: ['redux', 'router'],

  defaults: {
    react: {

      /**
       * ID of DOM Element the application will be mounted to
       */

      domElementId: 'root',

      /**
       * Generate the root component that will be mounted to the DOM
       */

      getRootComponent: function(lore) {
        const store = lore.store;
        const routes = lore.router.routes;
        const history = lore.router.history;

        return (
          <Provider store={store}>
            <Router history={history}>
              {routes}
            </Router>
          </Provider>
        );
      },

      /**
       * Mount the root component to the DOM
       */

      mount: function(Root, lore) {
        const config = lore.config.react;
        ReactDOM.render(Root, document.getElementById(config.domElementId));
      }
    }
  },

  load: function(lore) {
    // no-op
  }

};
