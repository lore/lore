import React, { useContext } from 'react';
import ActionsContext from '../contexts/ActionsContext';
import BlueprintsContext from '../contexts/BlueprintsContext';
import ReducerActionMapContext from '../contexts/ReducerActionMapContext';
import StoreContext from '../contexts/StoreContext';
import getConnection from '../getConnection';

export function useConnect(stateKey, params, options) {
  const actions = useContext(ActionsContext);
  const blueprints = useContext(BlueprintsContext);
  const reducerActionMap = useContext(ReducerActionMapContext);
  const store = useContext(StoreContext);

  const state = store.getState();

  const connection = getConnection(stateKey, reducerActionMap, actions, blueprints);
  return connection.getState(state, params, options);
}

export default useConnect;
