# Philosphy

Lore is a framework built on React, Webpack, Redux and React-Router, and makes no attempt to hide or abstract how the
underlying libraries work. It simply applies some conventions and patterns to make development easier, and builds in
concerns you'll often have to solve for later while growing you application. So if you really want to understand how
Lore works, it's recommended you study those libraries.

Lore is described as a "respectfully opinionated convention-driven framework for build React applications", and that
statement accurately represents the design philosophy.  While Lore does have (and express) opinions about client-side 
application development, the framework itself is built on a series of plugins, that can all be overriden.

Additionally, all of the underlying libraries and hooks have configurations exposed in the "/config" folder at the 
root of your project, which will allow you to control the underlying behavior of the libraries and hooks as an 
interim solution to overriding the full implementation.

**Extending Lore**: Most of the functionality and conventions that Lore uses are established by small plugins called 
"hooks". The `lore.connect` decorator for example is created and exposed by the `connect` hook. If you were to create 
a folder called `hooks` at the root of your project, you could override any or all of these built in behaviors. Removing
all of the hooks from Lore would amount to stripping the framework, and and reducing it to little more than a wrapper to
build a Webpack project and mount it to the DOM. To learn more about overriding the default behaviors for Lore, check
out **Extending Lore**.

**Architecture & Contributing**: If you're interesting in contributing to Lore, or simply want to know how it works, you
might be interesting in checking out the docs on the Architecture.  Here you can learn more about the thought process
behind the project, how it's organized, and get a deep dive into each of the default hooks. One of project's goals is
to make the code easy to read and understand, and to that end you'll find a README in each folder of the source code
that explains the purpose of the code in that folder. Additionally, each of the key functions in lore has a description
in the code that explains it's purpose.  If that interests you, check out the **Architecture Docs**.

**Recipes** In addition to being a framework, Lore is also striving to be a source of knowledge and best practices in the 
community. The things that are common across many applications will be absorbed into the framework.  Things like pagination, 
filtering, error handling, and real-time communication.  The things that are more specific to your application's user
experience will be absorbed into Recipes, and presented as recommended patterns.  These include things like user
authentication, loading screens, styling, modals dialogs, and wizards. We don't have docs for any recipes yet, but 
we'll be adding them as we go.  And if there's a specific use case you'd like to see captured as a Recipe, feel free to
suggest it and we'll see what we can do about creating it :)

