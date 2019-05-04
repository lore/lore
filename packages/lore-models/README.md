# @lore/models

### Purpose

Create a Model for every file in `src/models` and expose the resultant Models on `lore.models`.

### Dependant Hooks

None.

### Needed improvements

1. PascalCase the models that get exposed on `lore.models` (i.e. `lore.models.Todo` instead of `lore.models.todo`)

### Override Rules

Models typically need three things in order to be able to fetch a collection of resources

1. The URL of the API server to hit
2. The path to hit on the server (/todos for example)
3. A method to parse the server response (such as to convert timestamps or moment.js objects or something)

For apps that only have a single API server, the endpoint the models should use is the same the app is
configured for by default.  So that can be obtained from `apiRoot` in `config/models.js`. The path that
should be appended to the API Root can be derived from the model name (`todo`) and whether or not `pluraize` has 
been set to true or false in `config/models.js`. 

Then we just need to know how to parse the data, and for apps where the attribute field names in the models mirror
those in the API reponse (which is typical for new applications), even that method might be the same, especially if
you just want to convert globally applied timestamps like `createdAt` and `updatedAt` to an easier to work with format
like a moment.js object (unless you prefer to do the conversion in your components).

So for that scenario, the `parse` method can be pulled from `config/models.js`.

For apps that have been around for a while, and have survived API changes, it's not uncommon to have the parse methods
be a little more specific to that model, such as renaming fields befor the client code uses it to prevent API changes
from rippling through th applications.  For those scenarios, you may find yourself starting to populate files
like `src/models/todo.js`.
 
And if you're application consumes data from more than one API server, you'll also need to update the `urlRoot` in 
the individual `src/models/todo.js` files so they know which server they should talk to.

So given all of that, the `models` hook builds the configuration for each Model it creates using a set of
rules.

1. It first pulls in `config/models.js` to get the `apiRoot` and `pluralize` setting.
2. It then overrides that config with anything it finds in the individual config file located at `src/models/todo.js`, which will also include the 
`parse` method collections should use.
3. Finally, it fills in anything that still hasn't been defined using conventions (such as deriving the `urlRoot`
from the model name and the `pluralize` setting). 

### Example Usage

Given a project where a `todo` model has been created like so:

```sh
src
|-models
  |-todo.js
```

This hook will find it, create a Model from it (using a combination of the data in `config/models.js` and 
`src/models/todos.js`, and expose the Model on `lore.models.todo`.

