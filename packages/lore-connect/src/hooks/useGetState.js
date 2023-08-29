import React, { useContext } from 'react';
import ActionsContext from '../contexts/ActionsContext';
import BlueprintsContext from '../contexts/BlueprintsContext';
import ReducerActionMapContext from '../contexts/ReducerActionMapContext';
import StoreContext from '../contexts/StoreContext';
import getConnection from '../getConnection';

export function useGetState(stateKey, params, options) {
  const actions = useContext(ActionsContext);
  const blueprints = useContext(BlueprintsContext);
  const reducerActionMap = useContext(ReducerActionMapContext);
  const store = useContext(StoreContext);

  function getState(stateKey, params, options) {
    const state = store.getState();
    const connection = getConnection(stateKey, reducerActionMap, actions, blueprints);
    return connection._getState(state, params, options);
  }

  if (!stateKey) {
    return getState;
  }

  return getState(stateKey, params, options);
}

export default useGetState;
