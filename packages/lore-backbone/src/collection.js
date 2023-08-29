/* eslint prefer-spread: "off" */
/* eslint no-param-reassign: "off" */
/* eslint prefer-rest-params: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint consistent-return: "off" */
/* eslint no-plusplus: "off" */
/* eslint no-void: "off" */
/* eslint new-cap: "off" */

import _ from 'lodash';
import extend from './utils/extend';
import sync from './sync';
import Model from './model';

// Splices `insert` into `array` at index `at`.
const splice = function(array, insert, at) {
  at = Math.min(Math.max(at, 0), array.length);
  const tail = Array(array.length - at);
  const length = insert.length;
  let i;
  for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
  for (i = 0; i < length; i++) array[i + at] = insert[i];
  for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
};

const Collection = function(models, options) {
  options || (options = {});
  if (options.model) this.model = options.model;
  if (options.comparator !== void 0) {
    this.comparator = options.comparator;
  }
  this._reset();
  this.initialize.apply(this, arguments);
  if (models) {
    this.reset(models, _.extend({ silent: true }, options));
  }
};

// Attach all inheritable methods to the Model prototype.
_.extend(Collection.prototype, {

  // The default model for a collection is just a **Backbone.Model**.
  // This should be overridden in most cases.
  model: Model,

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function() {},

  // return a copy of the collections data
  toJSON: function () {
    return this.models.map(function (model) {
      return model.toJSON();
    });
  },

  // Add a model, or list of models to the set. `models` may be Backbone
  // Models or raw JavaScript objects to be converted to Models, or any
  // combination of the two.
  add: function(models, options) {
    return this.set(models, _.extend({}, options));
  },

  // Update a collection by `set`-ing a new list of models, adding new ones,
  // removing models that are no longer present, and merging models that
  // already exist in the collection, as necessary. Similar to **Model#set**,
  // the core operation for updating the data contained by the collection.
  set: function(models, options) {
    if (models == null) return;

    options = options || {};

    // parse the models
    models = this.parse(models, options) || [];

    if (!_.isArray(models)) {
      console.error('Expected models to be an array but got ', models, '. Did you forget to override parse to extract the models?');
    }

    const singular = !_.isArray(models);
    models = singular ? [models] : models.slice();

    // Turn bare objects into model references, and prevent invalid models
    // from being added.
    let model;
    let i;
    for (i = 0; i < models.length; i++) {
      model = models[i];

      // convert attributes to models, which will each be parsed during
      // the creation process
      model = this._prepareModel(model, options);

      models[i] = model;
    }

    // save the models in the collection
    this.models.length = 0;
    splice(this.models, models, 0);
    this.length = this.models.length;

    // Return the added model (or models).
    return singular ? models[0] : models;
  },

  // When you have more items than you want to add or remove individually,
  // you can reset the entire set with a new list of models, without firing
  // any granular `add` or `remove` events. Fires `reset` when finished.
  // Useful for bulk operations and optimizations.
  reset: function(models, options) {
    options = options ? _.clone(options) : {};
    this._reset();
    models = this.add(models, options);
    return models;
  },

  // Proxy `Backbone.sync` by default.
  sync: function() {
    return sync.apply(this, arguments);
  },

  // Fetch the default set of models for this collection, resetting the
  // collection when they arrive.
  fetch: function(options) {
    options = _.extend({ parse: true }, options);

    // Reset the default models
    const collection = this;
    options.success = function(attributes) {
      collection.reset(attributes, options);
    };

    return this.sync('read', this, options);
  },

  // **parse** converts a response into a list of models to be added to the
  // collection. The default implementation is just to pass it through.
  parse: function(response, options) {
    return response;
  },

  // Private method to reset all internal state. Called when the collection
  // is first initialized or reset.
  _reset: function() {
    this.length = 0;
    this.models = [];
    this._byId = {};
  },

  // Prepare a hash of attributes (or other model) to be added to this
  // collection.
  _prepareModel: function(attrs, options) {
    options = options ? _.clone(options) : {};
    options.collection = this;
    const model = new this.model(attrs, options);
    return model;
  }

});

Collection.extend = extend;

export default Collection;
