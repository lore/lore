import React, { useContext } from 'react';
import { Model, Collection } from '@lore/backbone';
import _ from 'lodash';
import { payload, payloadCollection } from '@lore/utils';
import { useQuery as _useQuery } from 'react-apollo-hooks';
import QueriesContext from '../contexts/QueriesContext';
import { ConfigContext } from '@lore/config';

export function useQuery(stateKey, variables) {
  const config = useContext(ConfigContext);
  const queries = useContext(QueriesContext);

  function getQuery(stateKey, variables) {
    const query = _.get(queries, stateKey);

    const { data, error, loading } = _useQuery(query(variables));

    const keys = stateKey.split('.');
    const modelName = keys[0];
    const method = keys[1];

    if (method === 'find') {
      const _Collection = Collection.extend({
        parse: config.graphql.collections.parse(modelName)
      });
      const collection = new _Collection(data);
      const state = config.graphql.getState(loading, error);
      return payloadCollection(collection, state, error, variables);
    }

    const _Model = Model.extend({
      parse: config.graphql.models.parse(modelName)
    });
    const model = new _Model(data, { parse: true });
    const state = config.graphql.getState(loading, error);
    return payload(model, state, error);
  }

  if (!stateKey) {
    return getQuery;
  }

  return getQuery(stateKey, variables);
}

export default useQuery;
