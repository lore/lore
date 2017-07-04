/* eslint no-param-reassign: "warn" */

import _ from 'lodash';
import { Hook } from 'lore-utils';
import userHooksLoader from '../loaders/userHooks';

/**
 * Obtain and merge the core hooks and user hooks.  If a user hook exists with
 * the same name as a core hook the user hook takes priority.
 *
 * @returns {Object} Final set of hooks that should be loaded into the application
 */
export default function getHooks(hookOverrides) {
  const userHookDefinitions = userHooksLoader.load();
  const hookDefinitions = _.assign({}, userHookDefinitions, hookOverrides);
  const hooks = _.mapValues(hookDefinitions, function(definition, hookName) {
    definition.id = hookName;
    return new Hook(definition);
  });
  return hooks;
}
