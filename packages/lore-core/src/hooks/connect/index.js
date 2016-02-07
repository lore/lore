var connect = require('./connect');

module.exports = {

  load: function(lore) {
    lore.connect = connect(lore);
  }

};
