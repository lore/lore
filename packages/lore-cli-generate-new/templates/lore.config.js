/**
 * Configuration file for the Lore CLI.
 */

module.exports = {
  commands: {
    // new: require('@lore/cli-generate-new'),
    // tutorial: require('@lore/cli-tutorial'),
    extract: {
      description: 'Create files that mirror the blueprint behavior',
      commands: {
        action: require('@lore/cli-extract-action'),
        reducer: require('@lore/cli-extract-reducer')
      }
    },
    generate: {
      description: 'Generate common project files',
      commands: {
        action: require('@lore/cli-generate-action'),
        collection: require('@lore/cli-generate-collection'),
        component: require('@lore/cli-generate-component'),
        // generator: require('@lore/cli-generate-generator'),
        model: require('@lore/cli-generate-model'),
        reducer: require('@lore/cli-generate-reducer')
      }
    }
  }
};
