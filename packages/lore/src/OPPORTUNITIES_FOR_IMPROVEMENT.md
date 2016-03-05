# Opportunities for Improvement

This is a catch-all for a list of things that could be improved.

### Opportunities

1. Hook order should be fully customizable...or at least fully customizable internally, with limited exposure for projects
to override (or full customization with an "override at your own risk" disclaimer).  Reason being that some custom user
hooks may need to get inserted between the projects default hooks, similar to the way that `connect` was inserted 
between `moduleloader` and `userconfig`. **UPDATE**: This was partially addressed, by implementing the `topsort` 
algorithm to sort hook load order based on their dependencies. But still no way for a user to control which hooks 
are on/off.

2. Need a better solution for loading decorators.  Currently they create a situation for where a file may try to use 
a decoratator like `@lore.connect` before the `connect` hook has actually executed, so `lore.connect` won't exist 
yet.  But that's only because some hooks load files, and that causes the file to be examined during load time. So we
need to imagine a scenario where users are defining lots of custom decorator hooks and come up with a solution to
address that. **UPDATE**: This was partially addressed by pulling `routes.js` out of `/config` and into the root of 
the project, and then making sure that it only gets loaded *after* all the hooks are loaded.

3. Implement a logging solution so the hook load order isn't printed to the console unless desired (i.e. typically
desired in production).  And then keep improving it until there's a granular logging solution in place (debug, 
info, verbose, silly, etc.).  Then color code it and make it pretty.  Should also allow logs to be sent to a storage 
service.
