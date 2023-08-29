/**
 * Returns the environment the application should be configured
 * for (production, development, test, etc.)
 *
 * @param {String} environment
 * @returns {string} The environment mode
 */

export function getEnvironment(environment = '') {
  return environment || process.env.LORE_ENV || 'development';
}
