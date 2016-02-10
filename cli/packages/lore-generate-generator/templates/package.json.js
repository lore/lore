var _ = require('lodash');
var util = require('util');

function getDependencyVersion(packageJSON, module, version) {
  return (
    packageJSON.dependencies && packageJSON.dependencies[module] ||
    packageJSON.devDependencies && packageJSON.devDependencies[module] ||
    packageJSON.peerDependencies && packageJSON.peerDependencies[module] ||
    packageJSON.optionalDependencies && packageJSON.optionalDependencies[module] ||
    version || '*'
  );
}

module.exports = function dataForPackageJSON(scope) {

  var lorePkg = scope.lorePackageJSON || {};
  var loreVersionDependency = (lorePkg.lore && lorePkg.lore.prerelease) || ('~' + lorePkg.version);
  var generatorName = scope.generatorName.replace(/^lore-/, '');

  return {
    name: scope.generatorName || '',
    version: '0.1.0',
    private: true,
    author: scope.author || '',
    license: 'MIT',
    description: scope.generatorDescription || '',
    keywords: ["lore"],
    dependencies: {
      bluebird: getDependencyVersion(lorePkg, 'bluebird', '^3.1.1'),
      lodash: getDependencyVersion(lorePkg, 'lodash', '>=3.9.x'),
      "lore-generate": getDependencyVersion(lorePkg, 'lore-generate')
    },
    devDependencies: {
      mocha: getDependencyVersion(lorePkg, 'mocha', '^2.3.4'),
    },
    scripts: {
      test: 'NODE_ENV=test mocha --recursive'
    },
    main: "src/index.js",
    loreGenerator: {
      "type": generatorName,
      "behavior": "default implementation of `lore " + generatorName + "`",
      "loreVersion": "*"
    }
  };
};
