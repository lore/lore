# Architecture

Explanation of the underlying architecture of Lore. Intended to accelerate the learning curve for anyone who wants 
to help improve it.

Lore's architecture is built around a series of plugins, and these plugins are where its opinions and conventions 
are expressed.  As Lore's goal is to *respectfully* opinionated, each of these plugins can also be overriden with 
your own implementation if needed.
 
Lore is broken apart into 3 main pieces:
 
###### **/app**
This is where the Lore engine resides.  It's principle responsibilities are:
1. Build the project-specific config
2. To load and execute each of the plugins
3. Render the application to the DOM

###### **/hooks**
Each folder under /hooks contains one of the hooks (plugins) that Lore uses to build it's behaviors.

###### **/loaders**
Anything that requires physically reading files goes into `/loaders`.  This is because the way files are loaded needed 
to be abstracted out to support testing.

#### Embedded Documentation

If you're looking for documentation on the specific code in Lore, most folders contain a README explaining the 
function of that folder, as do many files.  The intent was to create an experience where you could also learn about
the architecture simply by navigating the code base, but in a more user-friendly fashion than just reading the code.
