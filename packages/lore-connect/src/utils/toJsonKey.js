export default function toJsonKey(params) {
  // Why are we recreating the params object before stringify-ing it?
  //
  // In order for this lookup to work, we NEED the key we generate to match the key used to
  // store the data in the reducer. This is a challenge because there's no specification regarding
  // how objects get serialized, which means we can't guarantee that two objects with the same
  // keys will be serialized to the same JSON string. The order the keys are serialized is not
  // alphabetical, and is influenced by how the object was created.
  //
  // To address this, we're recreating the object here in the same way its created inside the 'find'
  // blueprint in '@lore/actions' (the 'where' property first, then 'pagination').
  //
  // A better solution might be to write a generic 'toKey(object)' function that iterates over
  // an object and recreates a new object by alphabetizing all the keys. If switching to that
  // approach the function should also iterate through the object recursively.
  //
  // More information about browser order for objects at this link:
  // https://bugs.chromium.org/p/v8/issues/detail?id=164

  return JSON.stringify({
    where: params.where,
    pagination: params.pagination
  });
}
