import _ from 'lodash';

export default function(target, options = {}) {
  if (_.isFunction(target)) {
    return target(options);
  }

  return target;
}
