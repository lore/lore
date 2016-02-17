# utils/requireDir.js

### Purpose

Helper method that knows how to convert a `require.context` instance into a nested object, where the folder names
are keys and the file contents end up being the values.

### Needed improvements

This needs to get refactored and moved into it's own library.  Technically it has one at 
[webpack-requiredir](https://github.com/storcery/webpack-requiredir) but this file is a modified version of that 
library.

TLDR is it needs to be more generic with a better interface, and then merged into webpack-requiredir.
