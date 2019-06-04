import { getFileFromContext } from './getFileFromContext';

// 'config/local'
// function loadLocalOverrideFile() {
//   const context = require.context(`${__LORE_ROOT__}/config`, false, /local.js$/);
//   const dictionary = buildDictionary(context, {
//     // options
//   });
//   return dictionary.local || {};
// }

export const getLocalConfig = function(context) {
  const defaultContext = require.context('../../config', false, /local.js$/);
  return getFileFromContext(context || defaultContext, {});
};
