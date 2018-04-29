import { ActionTypes, PayloadStates, payload } from 'lore-utils';

function getCid(modelName, model, store) {
  // if the model exists in the store, set the cid to match
  // what is on this client, to make sure it gets removed
  // from byCid as well, which will make sure it gets removed
  // from the find reducer.
  const storeModel = store.getState()[modelName].byId[model.id];
  return storeModel ? storeModel.cid : model.cid;
}

export default function(modelName, Model) {
  return function (store) {
    return function (message) {
      const model = new Model(message.data);
      model.cid = getCid(modelName, model, store);

      store.dispatch({
        type: ActionTypes.update(modelName),
        payload: payload(model, PayloadStates.DELETED)
      });
    };
  };
}
