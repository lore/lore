/* eslint no-undef: "off" */

import _getState from '../getState';

export default function(stateKey, params, options) {
  const getState = _getState(
    lore.actions,
    lore.config.connect.blueprints,
    lore.config.connect.reducerActionMap
  );

  const state = lore.store.getState();
  return getState(state, stateKey, params, options);
}
