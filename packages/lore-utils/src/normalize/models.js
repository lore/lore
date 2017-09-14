import _ from 'lodash';
import ActionTypes from '../ActionTypes';
import PayloadStates from '../PayloadStates';
import payload from '../payload';

export default function(NormalizedModel, normalizedModelName, attributeName) {
  return function normalize(actions, model) {
    // get the data we need to inspect for normalization
    const data = model.attributes[attributeName];

    // if the data is NOT a plain object, we can't normalize it, so bail out
    if (!_.isArray(data)) return;

    data.forEach(function (datum) {
      const normalizedModel = new NormalizedModel(datum);

      actions.push({
        type: ActionTypes.update(normalizedModelName),
        payload: payload(normalizedModel, PayloadStates.RESOLVED)
      });
    });
  }
}
