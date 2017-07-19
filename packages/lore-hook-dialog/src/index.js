/* eslint no-param-reassign: "off" */

import dialogManager from './dialogManager';

export default {

  defaults: {
    dialog: {
      domElementId: 'dialog'
    }
  },

  load: function(lore) {
    lore.dialog = dialogManager(lore);
  }

};
