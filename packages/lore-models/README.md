# Lore Models
AJAX abstraction tier for Lore.

### Interface

The interface for this library is designed to mirror [Backbone.Model](http://backbonejs.org/#Model) and [Backbone.Collection](http://backbonejs.org/#Collection) with the following modifications/notes/exceptions:

1. This library should not be used to pass data through your application. It is intended solely as an AJX abstraction tier. JSON data goes in, a request in made, and the response is serialized back into JSON and *then* emitted from an action for the reducers to pick up.
2. All event emitters have been removed.  Again, this is purely an abstraction tier, not a way to store your data.
3. The jQuery.ajax has been removed in favor of something much lighter weight that also facilitates testing in a non-browser environment (i.e. Node).


```js
var Model = require('lore-models').Model;
var sync = require('lore-models').sync;
var _ = require('lodash');

// The .extend() method is something that allows you to define common functionality in
// one model (like common parse methods or url buidling logic) and then build other
// models from that so you don't have to duplicate the code.
var Todo = Model.extend({

  // A model's unique identifier is stored under the id attribute. If you're 
  // directly communicating with a backend (CouchDB, MongoDB) that uses a different 
  // unique key, you may set a Model's idAttribute to transparently map from that 
  // key to id
  idAttribute: "id",

  // The endpoint used for CRUD operations.  The real url is build from this 
  // urlRoot + information like "if calling model.save() and there's already
  // a model.id property, the model must already exist, so we should make a
  // call to `PUT http://localhost:3000/api/todos/:id` to update the model.
  // If no model.id exists, then we should make a call to 
  // `POST http://localhost:3000/api/todos` to create the model.
  urlRoot: 'http://localhost:3000/api/todos',
  
  // url() is used to build the url for the request
  // if the API follows simple/flat conventions, there's rarely a need to override it
  // but for APIs without clear conventions, this function is quite useful
  // The code below is Backbone's default implementation (for reference)
  url: function() {
    var base =
      _.result(this, 'urlRoot') ||
      _.result(this.collection, 'url') ||
      urlError();
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
  },

  // initialize() is  especially useful for API endpoints with deeply 
  // nested URLs to help build the url later. It's called once, during
  // construction of the model
  initialize: function(attributes, options) {
    // set instance variables
  },
  
  // parse is called whenever a model's data is returned by the server, in fetch, 
  // and save. The function is passed the raw response object, and should return 
  // the attributes hash to be set on the model.
  parse: function(resp, options) {
    return resp;
  },
  
  // Uses sync to persist the state of a model to the server. Can be 
  // overridden for custom behavior.
  // This method has two really useful applications:
  //
  // 1. This method is especially useful for applications that have been around for
  // a time and survived API changes and the property names in the client side
  // JavaScript are no longer matched up to the server-side property names that
  // come back in the API. It allows you to trasform the data back to a format
  // that is meaningful to the server before sending the request
  //
  // 2. For inspecting the response before the application gets it.  For example,
  // if you wanted to log the user out of the application whenever an API response
  // returns a 401 (because their token expired) sync is a method that ALL requests
  // go through (or at least they all go through sync).  So it's a way to
  // observe and act on or log all network requests.
  sync: function() {
    return sync.apply(this, arguments);
  },
  
  // this interface allows you to create and refernce your own methods.  Not very
  // useful considering this interface is now meant solely to be an AJAX abstraction
  // teir (not answer questions about the internal data) but this quality could still
  // be useful if you need to build a url string or make some calculation or pull
  // something out of local storage or whatever before sending a request or parsing
  // data in a response
  yourOwnCustomMethod: function(){}
  
});
```

### Methods

#### model.fetch(options)

Fetches the model. So assuming the model has an id that was passed in during construction, it will call `http://localhost:300/api/todos/:id` to retrieve the model data.

#### model.save(key, val, options)

This will either become a PUT (update) or POST (create) request depending on whether the model has an id specified.  If you simply call `mode.save()` it will send all data attributes (model.attributs) to the server. If you pass in arguments, it will send only those attributs to the server (which is useful sometimes when certain API servers interpret the absence of data as being actionable, or throw errors when you pass in data you can't update instead of running it through a whitelist and ignoring it).

#### model.destroy

Will send a `DELETE http://localhost:300/api/todos/:id` request to the API server.

### Response Object
This library uses [Axios](https://github.com/mzabriskie/axios) to make AJAX calls, which has a [response schema](https://github.com/mzabriskie/axios#response-schema) that something like this:

```js
var response = {
  config: {
    headers: {
      Accept: "application/json, text/plain, */*"
    },
    method: "GET",
    parse: true,
    responseType: "json",
    url: "http://localhost:1337/todos/91"
  },
  data: {
    id: 91,
    title: "Update README",
    createdAt: "2016-07-02T00:00:06.407Z",
    updatedAt: "2016-07-02T00:00:06.407Z"
  },
  headers: {},
  request: function() {},
  status: 200,
  statusText: "OK"
};
```

So when you make a call like this:

```js
var todo = new Todo({
  id: 91
})

todo.fetch().then(function(response) {
  // do something with response
})
```

the response object in the promise looks like the example above
