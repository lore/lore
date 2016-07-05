var _ = require('lodash');
var extend = require('./utils/extend');
var sync = require('./sync');
var urlError = require('./utils/urlError');

var Model = function(attributes, options) {
  var attrs = attributes || {};
  options || (options = {});

  this.cid = _.uniqueId(this.cidPrefix);
  this.attributes = {};
  if (options.collection) this.collection = options.collection;
  if (options.parse) attrs = this.parse(attrs, options) || {};
  var defaults = _.result(this, 'defaults');
  attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
  this.set(attrs, options);
  this.changed = {};
  this.initialize.apply(this, arguments);
};

// Attach all inheritable methods to the Model prototype.
_.extend(Model.prototype, {

  // The value returned during the last failed validation.
  validationError: null,

  // The default name for the JSON `id` attribute is `"id"`. MongoDB and
  // CouchDB users may want to set this to `"_id"`.
  idAttribute: 'id',

  // The prefix is used to create the client id which is used to identify models locally.
  // You may want to override this if you're experiencing name clashes with model ids.
  cidPrefix: 'c',

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function(){},

  // Return a copy of the model's `attributes` object.
  toJSON: function(options) {
    return _.clone(this.attributes);
  },

  // Proxy `Backbone.sync` by default -- but override this if you need
  // custom syncing semantics for *this* particular model.
  sync: function() {
    return sync.apply(this, arguments);
  },

  // Get the value of an attribute.
  get: function(attr) {
    return this.attributes[attr];
  },

  // Returns `true` if the attribute contains a value that is not null
  // or undefined.
  has: function(attr) {
    return this.get(attr) != null;
  },

  // Set a hash of model attributes on the object, firing `"change"`. This is
  // the core primitive operation of a model, updating the data and notifying
  // anyone who needs to know about the change in state. The heart of the beast.
  set: function(key, val, options) {
    if (key == null) return this;

    // Handle both `"key", value` and `{key: value}` -style arguments.
    var attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options || (options = {});

    // Run validation.
    if (!this._validate(attrs, options)) return false;

    var current = this.attributes;

    // For each `set` attribute, update or delete the current value.
    for (var attr in attrs) {
      val = attrs[attr];
      current[attr] = val;
    }

    // Update the `id`.
    if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

    return this;
  },

  // Fetch the model from the server, merging the response with the model's
  // local attributes. Any changed attributes will trigger a "change" event.
  fetch: function(options) {
    options = _.extend({parse: true}, options);

    // After a successful fetch, the model is updated with the server-side state.
    var model = this;
    options.success = function(attributes) {
      if (options.parse) {
        attributes = model.parse(attributes, options);
      }

      if (attributes && !model.set(attributes, options)) {
        return false;
      }
    };

    return this.sync('read', this, options);
  },

  // Set a hash of model attributes, and sync the model to the server.
  // If the server returns an attributes hash that differs, the model's
  // state will be `set` again.
  save: function(key, val, options) {
    // Handle both `"key", value` and `{key: value}` -style arguments.
    var attrs;
    if (key == null || typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options = _.extend({validate: true, parse: true}, options);

    // If we're not waiting and attributes exist, save acts as
    // `set(attr).save(null, opts)` with validation. Otherwise, check if
    // the model will be valid when the attributes, if any, are set.
    if (attrs) {
      if (!this.set(attrs, options)) return false;
    } else if (!this._validate(attrs, options)) {
      return false;
    }

    // After a successful server-side save, the model is updated with the server-side state.
    var model = this;
    options.success = function(attributes) {
      if (options.parse) {
        attributes = model.parse(attributes, options);
      }

      if (attributes && !model.set(attributes, options)) {
        return false;
      }
    };

    var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
    if (method === 'patch' && !options.attrs) options.attrs = attrs;
    return this.sync(method, this, options);
  },

  // Destroy this model on the server if it was already persisted.
  // Optimistically removes the model from its collection, if it has one.
  // If `wait: true` is passed, waits for the server to respond before removal.
  destroy: function(options) {
    options = options ? _.clone(options) : {};
    return this.sync('delete', this, options);
  },

  // Default URL for the model's representation on the server -- if you're
  // using Backbone's restful methods, override this to change the endpoint
  // that will be called.
  url: function() {
    var base =
      _.result(this, 'urlRoot') ||
      _.result(this.collection, 'url') ||
      urlError();
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
  },

  // **parse** converts a response into the hash of attributes to be `set` on
  // the model. The default implementation is just to pass the response along.
  parse: function(resp, options) {
    return resp;
  },

  // A model is new if it has never been saved to the server, and lacks an id.
  isNew: function() {
    return !this.has(this.idAttribute);
  },

  // Run validation against the next complete set of model attributes,
  // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
  _validate: function(attrs, options) {
    if (!options.validate || !this.validate) return true;
    attrs = _.extend({}, this.attributes, attrs);
    var error = this.validationError = this.validate(attrs, options) || null;
    if (!error) return true;
    return false;
  }

});

Model.extend = extend;

module.exports = Model;
