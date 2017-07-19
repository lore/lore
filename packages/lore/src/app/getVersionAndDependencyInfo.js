import packageLoader from '../loaders/package';

/**
 * Read the current version of Lore from the package.json file and create
 * a simple object to access it from.
 *
 * @returns {Object} Information about the current version of Lore
 */
export default function getVersionAndDependencyInfo() {
  const json = packageLoader.load();

  return {
    version: json.version,
    majorVersion: json.version.split('.')[0].replace(/[^0-9]/g, ''),
    minorVersion: json.version.split('.')[1].replace(/[^0-9]/g, ''),
    patchVersion: json.version.split('.')[2].replace(/[^0-9]/g, ''),
    dependencies: json.dependencies
  };
}
