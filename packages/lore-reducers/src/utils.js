/* eslint consistent-return: "off" */
/* eslint no-param-reassign: "off" */
/* eslint max-len: "off" */

import _ from 'lodash';

function byId(models) {
  const modelsById = {};

  models.data.forEach(function(model) {
    if (model.id) {
      modelsById[model.id] = model;
    }
  });

  return modelsById;
}

function byCid(models) {
  const modelsByCid = {};

  models.data.forEach(function(model) {
    if (model.cid) {
      modelsByCid[model.cid] = model;
    }
  });

  return modelsByCid;
}

function byCustomField(fieldName, models) {
  const modelsByCustomField = {};

  models.data.forEach(function(model) {
    if (model[fieldName]) {
      modelsByCustomField[model[fieldName]] = model;
    }
  });

  return modelsByCustomField;
}

function getIndex(state, model) {
  const existingModel = _.find(state.data, function(m) {
    if (m.id && model.id) {
      return m.id === model.id;
    } else if (m.cid && model.cid) {
      return m.cid === model.cid;
    }
  });

  if (existingModel) {
    return _.indexOf(state.data, existingModel);
  }

  return -1;
}

function addModel(state, model) {
  const index = getIndex(state, model);

  if (index >= 0) {
    throw new Error('model already exists');
  }

  state.data.push(model);
  return state;
}

function updateModel(state, model) {
  const index = getIndex(state, model);
  if (index < 0) throw new Error('index < 0');
  state.data.splice(index, 1, model);
  return state;
}

function addOrUpdateModel(state, model) {
  const index = getIndex(state, model);

  if (index >= 0) {
    return updateModel(state, model);
  }

  return addModel(state, model);
}

function removeModel(state, model) {
  const index = getIndex(state, model);
  if (index < 0) throw new Error('index < 0');
  state.data.splice(index, 1);
  return state;
}

function mergeModels(state, list) {
  list.data.forEach(function(model) {
    addOrUpdateModel(state, model);
  });
  return state;
}

function replaceModels(state, list) {
  return list;
}

function copyState(state, list) {
  state.state = list.state;
  state.error = list.error;
  return state;
}

function mergeModelsAndCopyState(state, list) {
  return copyState(mergeModels(state, list), list);
}

const customDictionaryHelpers = {

  removePayloadFromDictionaryUnderKeyIfActionMatchesType: function(actionType, dictionary, keyName, action) {
    if (action.type === actionType) {
      const model = action.payload;
      const key = model.data[keyName];
      if (!key) throw new Error(`missing model.data.${keyName}`);

      try {
        dictionary[key] = removeModel(dictionary[key], model);
      } catch (err) {
        console.warn('could not remove model from dictionary');
      }
    }

    return dictionary;
  },

  insertModelsFromListIntoDictionaryUnderKey: function(dictionary, keyName, collection, state) {
    collection.data.forEach(function(model) {
      const key = model.data[keyName];
      if (!dictionary[key]) {
        dictionary[key] = {
          state: state,
          data: []
        };
      }
      dictionary[key].data.push(model);
    });

    return dictionary;
  },

  addKeysFromPreviousDictionaryIfNotInCurrent: function(previousDictionary, dictionary) {
    Object.keys(previousDictionary).forEach(function(key) {
      if (!dictionary[key]) {
        dictionary[key] = previousDictionary[key];
      }
    });

    return dictionary;
  },

  insertPayloadIntoDictionaryUnderKeyIfActionMatchesType: function(actionType, dictionary, keyName, action) {
    const key = action[keyName];

    if (action.type === actionType) {
      if (!key) throw new Error(`missing action.${keyName}`);
      dictionary[key] = action.payload;
    }

    return dictionary;
  }

};

export {
  byId,
  byCid,
  byCustomField,
  getIndex,
  addModel,
  addOrUpdateModel,
  updateModel,
  removeModel,
  mergeModels,
  replaceModels,
  copyState,
  mergeModelsAndCopyState,
  customDictionaryHelpers
};
