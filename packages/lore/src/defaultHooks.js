/**
 * Default hooks
 *
 * The list of built-in hooks that should be loaded by default.  The key specifies the name of the folder the hook
 * is in and the value is whether the hook should be loaded.
 *
 * This file could be removed if we followed the same dynamic loading strategy we use with initializers, models,
 * user config, etc.  If we go that route we need to consider whether we would ever have an hook that we did NOT
 * want loaded by default.
 */

module.exports = {
  connect: true,
  models: true,
  collections: true,
  reducerBlueprints: true,
  reducers: true,
  redux: true,
  dialog: true,
  actionBlueprints: true,
  actions: true
};
