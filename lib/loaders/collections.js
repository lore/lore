var buildDictionary = require('webpack-requiredir');

module.exports = {

  load: function () {
    var context = require.context(__LORE_ROOT__ + '/src/collections', false, /\.js$/);
    return buildDictionary(context, {
      // options
    });
  }

};