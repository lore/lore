import assign from "lodash.assign";

/**
 * Helper function to correctly extend classes
 * @param protoProps
 * @param staticProps
 * @returns {*}
 */
export default function extend( protoProps, staticProps ) {
  let parent = this;

  //extend the parent
  let child = class extends parent {
  };

  //assign prototype props
  assign(child.prototype, protoProps);

  //assign static props
  assign(child, parent, staticProps);

  return child;

};

