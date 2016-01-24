var topsort = require('topsort');

function getDependencyGraph(hooks) {
  var dependencyGraph = [];

  Object.keys(hooks).forEach(function(hookName) {
    if (!hooks[hookName]) {
      return;
    }

    var dependencies = hooks[hookName].dependencies || [];

    if(dependencies.length === 0) {
      dependencyGraph.push([hookName]);
    }

    dependencies.forEach(function(dependency) {
      dependencyGraph.push([dependency, hookName]);
    });
  });

  return dependencyGraph;
}

module.exports = function sortBooksByLoadOrder(hooks, log) {
  var dependencyGraph = getDependencyGraph(hooks);
  log.debug('hook dependency graph: ', dependencyGraph);

  var sortedDependencies = topsort(dependencyGraph);
  log.debug('loading sorted hooks: ', sortedDependencies);

  return sortedDependencies.map(function(hookName) {
    return hooks[hookName];
  });
};
