/* eslint eqeqeq: "off" */
/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { ActionTypes } from '@lore/utils';

/*
 * byCid Reducer Blueprint
 */

// IMPORTANT!! This is a modified version of _.findKey that doesn't compare types.
// This is needed because when the API server uses Numbers as primary keys, the
// initial GET request based on an ID in the url is created as a string in the
// primary key ({id: '123'}). But when the response comes back from the server, the
// id is corrected in the data to be a number ({id: 123}).  Without this modified
// function, you can end up polluting the reducer store with duplicate data because it
// will see an id of '123' and an id of 123 as two different objects. This function
// will merge them together, and overwrite the initially incorrect '123' id with the
// proper 123 id.
function findKey(state, object) { // 1 or '1'
  const keys = _.keys(state); // [1,2,'3']

  return _.find(keys, function(key) {
    return state[key].id == object.id;
  });
}

function addOrUpdateByCid(nextState, payload) {
  const cid = payload && payload.cid;
  let cidWithDuplicatedId = null;

  if (cid) {
    if (payload.id) {
      cidWithDuplicatedId = findKey(nextState, { id: payload.id });

      // if we find a cid with a matching id, update that model with
      // the latest data, but keep the original cid
      if (cidWithDuplicatedId) {
        nextState[cidWithDuplicatedId] = _.assign({}, payload, {
          cid: cidWithDuplicatedId
        });
      } else {
        nextState[cid] = payload;
      }
    } else {
      nextState[cid] = payload;
    }
  }

  return nextState;
}

function removeByCid(nextState, payload) {
  const cid = payload && payload.cid;
  if (cid) {
    delete nextState[cid];
  }
  return nextState;
}

export default function(modelName) {
  return function byCid(state, action) {
    state = state || {};
    const nextState = _.assign({}, state);

    switch (action.type) {
      case ActionTypes.add(modelName):
        return addOrUpdateByCid(nextState, action.payload);

      case ActionTypes.update(modelName):
        return addOrUpdateByCid(nextState, action.payload);

      case ActionTypes.remove(modelName):
        return removeByCid(nextState, action.payload);

      case ActionTypes.fetchPlural(modelName):
        action.payload.data.forEach(function(datum) {
          addOrUpdateByCid(nextState, datum);
        });
        return nextState;

      default:
        return nextState;
    }
  };
}
