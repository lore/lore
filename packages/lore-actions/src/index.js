import utils from './utils';
import createBlueprint from './blueprints/create';
import destroyBlueprint from './blueprints/destroy';
import getBlueprint from './blueprints/get';
import findBlueprint from './blueprints/find';
import updateBlueprint from './blueprints/update';

const blueprints = {
  create: createBlueprint,
  destroy: destroyBlueprint,
  get: getBlueprint,
  find: findBlueprint,
  update: updateBlueprint
};

export {
  utils,
  blueprints
};
