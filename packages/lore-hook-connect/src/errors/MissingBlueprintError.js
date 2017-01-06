module.exports = function MissingBlueprintError(key) {
  var error = new Error(
    'There was no blueprint provided for `' + key + '`. ' +
    'You must provide one if your getState call does not map to conventions.`'
  );
  error.name = 'MissingBlueprintError';
  return error;
};
