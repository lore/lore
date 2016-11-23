var Lore = require('lore');

// Allows you to access your lore app globally as well as from within
// the console. Remove this line if you don't want to be able to do that.
window.lore = Lore;

// Summon the app!
Lore.summon({
  hooks: {
    actions: require("lore-hook-actions"),
    bindActions: require("lore-hook-bind-actions"),
    collections: require("lore-hook-collections"),
    connect: require("lore-hook-connect"),
    dialog: require("lore-hook-dialog"),
    dialogs: require('lore-hook-dialogs-material-ui'), // for example
    models: require("lore-hook-models"),
    reducers: require("lore-hook-reducers"),
    redux: require("lore-hook-redux")
  }
});
