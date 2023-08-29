import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection } from '@lore/utils';

function parse(data) {
  return data;
}

function query(model) {
  return {};
}

export default function(NormalizedCollection, normalizedCollectionName, attribute, attributeName) {
  return function normalize(actions, model) {
    // get the data we need to inspect for normalization
    const data = model.attributes[attributeName];

    // if the data is NOT a plain object, we can't normalize it, so bail out
    if (!_.isArray(data)) return;

    const collection = new NormalizedCollection(
      attribute.parse ? attribute.parse(data, model) : parse(data, model)
    );
    const combinedQuery = attribute.query ? attribute.query(model) : query(model);

    actions.push({
      type: ActionTypes.fetchPlural(normalizedCollectionName),
      payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
      query: combinedQuery
    });
  };
}
