import initializerLoader from '../loaders/initializers';

/**
 * Obtain the set of initializers that should be executed.
 *
 * @returns {Object} Set of initializers that should be loaded and executed.
 */
export default function getInitializers() {
  return initializerLoader.load();
}
