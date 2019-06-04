import _ from 'lodash';
import buildDictionary from 'webpack-requiredir';

// 'config/*'
export const getBaseConfig = function(context) {
  const defaultContext = require.context(`${__LORE_ROOT__}/config`, false, /^(?!.*(?:local.js$)).*\.js$/);
  return buildDictionary(defaultContext, {
    // exclude: ['local.js']
  });
};
