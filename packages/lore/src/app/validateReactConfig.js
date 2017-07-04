/**
 * Validate the React config, and confirm it has the required methods
 */
export default function validateReactConfig(config) {
  if (!config) {
    throw new Error('No React config found. You must include the lore-hook-react hook, or create a config/react.js file manually.');
  }

  if (!config.getRootComponent) {
    throw new Error('React config has no getRootComponent() method.');
  }

  if (!config.mount) {
    throw new Error('React config has no mount() method.');
  }
}
