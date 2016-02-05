var dialogManager = require('./dialogManager');

module.exports = {

  defaults: {
    dialog: {
      domElementId: 'dialog'
    }
  },

  load: function(lore) {
    lore.dialog = dialogManager(lore);
  }

};
