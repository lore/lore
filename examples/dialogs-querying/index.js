var Lore = require('lore');

// Allows you to access your lore app globally as well as from within
// the console. Remove this line if you don't want to be able to do that.
window.lore = Lore;

// Note: Intercepts all requests and replaces them with requests against the client store.
// Remove this to use a real server.
var fauxServer = require('faux-server')();

// Summon the app!
Lore.summon();
