import { getFileFromContext } from './getFileFromContext';

// 'config/env/*'
// function loadEnvConfigFile(env) {
//   const context = require.context(`${__LORE_ROOT__}/config/env`, false, /\.js$/);
//   const dictionary = buildDictionary(context, {
//     // options
//   });
//   return dictionary[env] || {};
// }

export const getEnvConfig = function(environment) {
  return require(`${__LORE_ROOT__}/config/env/${environment || 'development'}`).default;
};
