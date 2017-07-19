/**
 * Returns the environment the application should be configured
 * for (production, development, test, etc.)
 *
 * @param {Object} configOverride The configuration passed into lore.build(configOverride)
 * @returns {string} The environment mode
 */

export default function getEnvironment(configOverride) {
  return configOverride.environment || process.env.NODE_ENV || 'development';
}
