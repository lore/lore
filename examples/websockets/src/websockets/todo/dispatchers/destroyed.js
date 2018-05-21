import { ActionTypes, PayloadStates, payload } from 'lore-utils';

function getCid(model, store) {
  // if the model exists in the store, set the cid to match
  // what is on this client, to make sure it gets removed
  // from byCid as well, which will make sure it gets removed
  // from the find reducer.
  const storeModel = store.getState().todo.byId[model.id];
  return storeModel ? storeModel.cid : model.cid;
}

export default function(store){
  return function(message) {
    const Model = lore.models.todo;

    const model = new Model(message.data);
    model.cid = getCid(model, store);

    store.dispatch({
      type: ActionTypes.remove('todo'),
      payload: payload(model, PayloadStates.RESOLVED)
    });
  }
};
