import extend from "./extend";
import assign from "lodash.assign";
import uniqueId from "lodash.uniqueid";
import sync from "./sync";
import {type} from "./constants";
import result from "lodash.result";
import clone from "lodash.clone";

/**
 * The Model class represents the base AJAX abstraction tier for lore. The
 * Model is tailored after Backbone Models, with a subset of functions
 * @param attributes
 * @param options
 * @constructor
 */
class Model {
  constructor( attributes = {}, options = {collection: null} ) {
    this.cid = uniqueId(this.cidPrefix);
    this.id = attributes[this.idAttribute];
    this.attributes = assign({}, attributes);
    this.collection = options.collection;

    this.initialize.apply(this, arguments);

    //prebind the appropriate methods
    this.url = this.url.bind(this);
    this.isNew = this.isNew.bind(this);
    this.toJSON = this.toJSON.bind(this);
    this.parse = this.parse.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * Initialize is an empty function, can be overridden
   */
  initialize() {

  }

  /**
   * Initialize an empty parse function, can be overridden
   */
  parse( attributes ) {
    return attributes;
  }

  /**
   * Fetch the model from the server, returning the response and storing the ID
   */
  fetch( options = {parse: true} ) {
    const req = this.sync(type.GET, this, options);

    return new Promise(( resolve, reject )=> {
      req.then(( resp )=> {
        //store our response

        let serverAttrs = options.parse ? this.parse(resp.data) : resp.data;

        //set id
        this.id = serverAttrs[this.idAttribute] || this[this.idAttribute];

        //set the attributes
        assign(this.attributes, serverAttrs);

        //resolve with the new attributes
        resolve(this.attributes);

      }, ( err )=> {
        reject(err);
      });
    })

  }

  /**
   * Get a value from the attributes
   * @param key
   * @returns value
   */
  get( key ) {
    return this.attributes[key];
  }

  /**
   * Set a value on the attributes
   * @param key
   * @param value
   * @returns {Model}
   */
  set( key, value ) {

    let attrs;
    if ( typeof key === 'object' ) {
      attrs = key;
    } else {
      (attrs = {})[key] = value;
    }

    //set the values
    assign(this.attributes, attrs);

    //set the id
    this.id = this.attributes[this.idAttribute] || this[this.idAttribute];

    return this;
  }

  /**
   * Save the model to the server
   * @param options
   */
  save( options = {parse: true} ) {
    return new Promise(( resolve, reject )=> {
      //determine the correct sync call based on whether the model is new
      const req = this.isNew()
        ? this.sync(type.POST, this, options)
        : this.sync(type.PUT, this, options);

      req.then(( resp )=> {

        //store our response
        let serverAttrs = options.parse ? this.parse(resp.data) : resp.data;

        //set id
        this.id = serverAttrs[this.idAttribute] || this[this.idAttribute];

        //set the attributes
        assign(this.attributes, serverAttrs);

        //resolve with the new attributes
        resolve(this.attributes);

      }, ( err )=> {

        reject(err);
      });
    })
  }

  destroy( options = {} ) {
    return new Promise(( resolve, reject )=> {
      //determine the correct sync call based on whether the model is new
      this.sync(type.DELETE, this, options).then(( resp )=> {

        //resolve
        resolve(resp.data || null);

      }, ( err )=> {

        reject(err);
      });
    })
  }

  /**
   * Serialize the attributes to JSON
   */
  toJSON() {
    return clone(this.attributes);
  }

  /**
   * Does the model contain an ID attribute? If not, it is considered new
   * @returns {*}
   */
  isNew() {
    return !this.attributes[this.idAttribute];
  }

  /**
   * Get the URL for this model
   * @returns {*}
   */
  url() {
    var base =
          result(this, 'urlRoot') ||
          result(this.collection, 'url');

    if ( !base ) {
      throw new Error("No urlRoot specified in model or no collection with url specified");
    }

    if ( this.isNew() ) return base;
    var id = this.attributes[this.idAttribute];
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
  }
}

/**
 * Extend prototype with required properties
 * TODO This can be removed once ES7 Class properties become final
 */
assign(Model.prototype, {
  idAttribute: 'id',
  cidPrefix: 'c',
  urlRoot: 'http://www.example.com',
  sync
});

/**
 * Add extend method
 * TODO This can go away once ES7 Static class properties become final
 */
Model.extend = extend;

//default export
export default Model;
