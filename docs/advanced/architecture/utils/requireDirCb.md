# utils/requireDirCb.js

### Purpose

Exactly the same as utils/requireDir, except the result is returned through a callback instead of directly. Otherwise 
known as "this is a terrible hack of a file and should be deleted as soon as reasonably possible"

### Needed improvements

Decide whether this method will be a callback or not, and merge the result into `webpack-requiredir` for general use.
