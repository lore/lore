/* eslint no-restricted-syntax: "off" */
/* eslint no-prototype-builtins: "off" */
/* eslint no-continue: "off" */

/**
 * Flatten javascript objects into a single-depth object
 * https://gist.github.com/penguinboy/762197
 *
 * @param {Object} ob
 * @returns {Object}
 */

export default function flattenObject(ob) {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
