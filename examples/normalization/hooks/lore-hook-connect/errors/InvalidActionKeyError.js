module.exports = function InvalidActionKeyError(key) {
  var error = new Error(
    'There is no action registered for `' + key + '`'
  );
  error.name = 'InvalidActionKeyError';
  return error;
};
