module.exports = function InvalidReducerKeyError(key) {
  var error = new Error(
    'There is no reducer registered for `' + key + '`'
  );
  error.name = 'InvalidReducerKeyError';
  return error;
};
