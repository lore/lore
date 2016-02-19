# Config

This folder contains all of the configuration settings for lore.

The final configuration for Lore is determined as follows:

1. **Build the config object** - A configuration object is built from everything in /config (excluding /dev an local.js)
2. **Apply environent specific settings** - The appropriate environment config is pulled from /env and overrides any config options previously
specified.
3. **Apply any settings in local.js** - Local.js is examined, and any config options specified there will override anything previously.
