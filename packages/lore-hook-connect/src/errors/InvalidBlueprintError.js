module.exports = function InvalidBlueprintError(invalidBlueprintName, valueBlueprintNames) {
  var error = new Error(
    'There was no blueprint found matching the name `' + invalidBlueprintName + '`. ' +
    'Valid blueprints are: ' + valueBlueprintNames.join(', ')
  );
  error.name = 'InvalidBlueprintError';
  return error;
};
