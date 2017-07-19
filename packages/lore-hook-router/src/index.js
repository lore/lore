/* eslint no-param-reassign: "off" */

import { browserHistory } from 'react-router';

export default {

  dependencies: ['connect'],

  defaults: {
    router: {
      history: browserHistory,
      routes: function(lore) {
        return lore.loader.loadRoutes();
      }
    }
  },

  load: function(lore) {
    const config = lore.config.router;
    lore.router = {
      history: config.history,
      routes: config.routes(lore)
    };
  }

};
