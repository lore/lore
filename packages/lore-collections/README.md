# @lore/collections

### Purpose

Iterates through all models in `lore.models` and creates a corresponding Collections for each of them. This is done
so we can fetch collections of resources and not just individual resources. 

### Dependant Hooks

Depends on the `models` hook being run first as it iterates through `lore.models`.

### Needed improvements

1. Provide an option to not create collections for certain models.
2. PascalCase the collections that get exposed on `lore.collections` (i.e. `lore.collections.Todo` instead 
of `lore.collections.todo`)

### Override Rules

Collections typically need three things in order to be able to fetch a collection of resources

1. The URL of the API server to hit
2. The path to hit on the server (/todos for example)
3. A method to parse the server response, to extract the meaningful data from any paginated metadata wrapper 
that might exist
4. Which Model it should create and pass the resultant data to, to make sure each resource also gets parsed 
correctly in turn

For apps that only have a single API server, the endpoint the collections should use is the same the app is
configured for by default.  So that can usually be obtained from `apiRoot` in `config/models.js`. The path that
should be appended to the API Root can be derived from the models (`todo`) and whether or not `pluraize` has 
been set to true or false in `config/models.js`. The Model that knows how to parse the resultant resources is 
typically going to be the model with the same name as the colletion (`lore.models.todo`). The only piece that
can't be derived from other parts of the configuration is the parse method the Collection should use to extract
the collection of resources from the other metadata like pagination. So that method should be specified in 
`config/collection.js`. If the API follows consistent conventions across all collection endpoints (and there's
 only a single API server) there isn't a common reason to ever need to define a `src/collection/todo.js` file. If
 you do, it's to override the previous semi-deriable configuration with something specific to that collection.
  
So given all of that, the `collections` hook builds the configuration for each Collection it creates using a set of
rules.

1. It first pulls in `config/models.js` to get the `apiRoot` and `pluralize` setting.
2. It then overrides that config with anything it finds in `config/collections.js`, which will also include the 
`parse` method collections should use.
3. It then looks to see if collection file has been created in `src/collections` that matches the name of the
model (`todo` in this example). If one exists, it then overrides the previous config with anything it finds in
that file.
4. Finally, it fills in anything that still hasn't been defined using conventions (such as deriving the `urlRoot`
from the model name and the `pluralize` setting). 

### Example Usage

Given a project where a `todo` model has been created like so:

```sh
src
|-models
  |-todo.js
```

This hook will find it, create a Collection with it, and expose the collection on `lore.collections.todo`.

