# Extending Lore

The majority of Lore is implemented as a collection of overridable hooks, similar to a plugin system. This allows you
to change large chunks of it's behavior without needing to modify the library itself.  Instead it can be modified on
a per-project basis.  You can do so either by defining hooks within your project itself (by placing your own hook
definitions in a specific location) or by installing a hook through `npm install` and configure your `.lorerc` file
to use that version of the hook instead.

Things that need to be added here:

1. How to create your own hook.  Example should include both types of override; placing files in the project
itself and also by downloading a package from npm and modifying the `.lorerc` file.
2. How to create your own generators and extend the CLI
