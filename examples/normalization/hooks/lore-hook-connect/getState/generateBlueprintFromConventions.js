module.exports = function generateBlueprintFromConventions(stateKey) {
  var tokens = stateKey.split('.');
  var modelName = tokens[0];
  var reducer = tokens[1];

  if (reducer === 'find') {
    return {
      action: modelName + '.find',
      blueprint: 'find'
    };
  } else if (reducer === 'byId') {
    return {
      action: modelName + '.get',
      blueprint: 'byId'
    };
  }
};
