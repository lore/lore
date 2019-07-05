/* eslint no-param-reassign: "off" */

import _ from 'lodash';

import create from '../_blueprints/create';
import destroy from '../_blueprints/destroy';
import find from '../_blueprints/find';
import get from '../_blueprints/get';
import update from '../_blueprints/update';

const actionBlueprints = {
  create,
  destroy,
  find,
  get,
  update
};

function convertBlueprintToActionCreator(action) {
  // if the module isn't a function, then it's an object describing the action
  // config and needs to be converted to a real function
  if (!_.isFunction(action)) {
    action = actionBlueprints[action.blueprint](action);
  }

  return action;
}

export default function convertBlueprintsToActionCreators(actions) {
  Object.keys(actions).forEach(function(key) {
    const action = actions[key];
    let boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0 && Object.keys(action).indexOf('blueprint') < 0) {
      boundAction = convertBlueprintsToActionCreators(action);
    } else {
      boundAction = convertBlueprintToActionCreator(action);
    }
    actions[key] = boundAction;
  });
  return actions;
}
