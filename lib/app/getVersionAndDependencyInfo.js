var packageLoader = require('../loaders/package');

module.exports = function getVersionAndDependencyInfo() {
  var json = packageLoader.load();

  return {
    version: json.version,
    majorVersion: json.version.split('.')[0].replace(/[^0-9]/g, ''),
    minorVersion: json.version.split('.')[1].replace(/[^0-9]/g, ''),
    patchVersion: json.version.split('.')[2].replace(/[^0-9]/g, ''),
    dependencies: json.dependencies
  };
};