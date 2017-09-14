import _ from 'lodash';
import ActionTypes from '../ActionTypes';
import PayloadStates from '../PayloadStates';
import payload from '../payload';

export default function(NormalizedModel, normalizedModelName, attributeName) {
  return function normalize(actions, model) {
    // get the data we need to inspect for normalization
    const data = model.attributes[attributeName];

    // if the data is NOT a plain object, we can't normalize it, so bail out
    if (!_.isPlainObject(data)) return;

    // create an instance of the normalized model populated with the nested data
    const normalizedModel = new NormalizedModel(data);

    // replace the attribute with it's normalized form (a reference to the id)
    model.set(attributeName, normalizedModel.id);

    // add an action to be dispatched
    actions.push({
      type: ActionTypes.update(normalizedModelName),
      payload: payload(normalizedModel, PayloadStates.RESOLVED)
    });
  }
}
