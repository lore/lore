import React, { useContext } from 'react';
import { Model, Collection } from '@lore/backbone';
import _ from 'lodash';
import { payload, payloadCollection } from '@lore/utils';
import { useMutation as _useMutation } from 'react-apollo-hooks';
import MutationsContext from '../contexts/MutationsContext';
import { ConfigContext } from '@lore/config';

export function useMutation(stateKey, variables) {
  const config = useContext(ConfigContext);
  const mutations = useContext(MutationsContext);

  const mutation = _.get(mutations, stateKey);

  const { data, error, loading } = _useMutation(mutation(variables));

  const keys = stateKey.split('.');
  const modelName = keys[0];
  const method = keys[1];

  const _Model = Model.extend({
    // parse: config.graphql.parse(modelName)
  });
  const model = new _Model(data);
  const state = config.graphql.getState(loading, error);
  return payload(model, state, error);
}

export default useMutation;
