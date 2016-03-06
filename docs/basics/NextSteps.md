# Next Steps

Now that you've made it through the Lore tutorial, you have some options about how to proceed.

**Advanced Tutorial**: The tutorial (and the conventions Lore uses to make it easier to build React/Redux applications) assume certain 
things about your API.  But in reality, those conventions will not always hold true.  If you'd like to learn more
about how to override Lore's default behaviors and insert your own, check out the **Advanced Tutorial**.
 
**Extending Lore**: Most of the functionality and conventions that Lore uses are established by small plugins called 
"Hooks". The `lore.connect` decorator for example is created and exposed by the `connect` hook. If you were to create 
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

**Recipes** Lore isn't just a framework; it's also striving to be a source of knowledge and best practices in the 
community. The things that are common across many applications will be absorbed into the framework.  Things like pagination, 
filtering, error handling, and real-time communication.  The things that are more specific to your application's user
experience will be absorbed into Recipes, and presented as recommended patterns.  These include things like user
authentication, loading screens, styling, modals dialogs, and wizards. We don't have docs for any recipes yet, but 
we'll be adding some soon.  And if there's a specific use case you'd like to see captured as a Recipe, feel free to
suggest it and we'll see what we can do about creating it :)

**CLI**: The CLI for Lore is intended to be a complimentary utiltiy to the framework itself.  It has the ability to
generate common files, which can be especially useful when you need to override a default action or reducer. It also
has the ability to generate Gulp tasks to help when publishing your project, and you can add your own generators
if there's something you find yourself needing to create often.  To learn more about the CLI and adding your own
generators check out the **CLI Docs**.
