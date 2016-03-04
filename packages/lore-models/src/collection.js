import extend from "./extend";
import axios from "axios";
import assign from "lodash.assign";
import Model from "./model";
import sync from "./sync";
import {type} from "./constants";

class Collection {
  constructor( attributes = {}, options = {} ) {

    //store the models
    this.models = [];

    this.initialize.apply(this, arguments);

    this.parse = this.parse.bind(this);
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

  fetch( options = {parse: true} ) {
    return new Promise(( resolve, reject )=> {
      const req = this.sync(type.GET, this, options);
      req.then(( resp )=> {
        //store our response
        let result = options.parse ? this.parse(resp.data) : resp.data;

        //store the models
        this.models = result.map(r => new this.model(r, {collection: this}));

        //resolve with the new attributes
        resolve(this.models);

      }, ( err )=> {
        reject(err);
      });
    })
  }

  /**
   * Save the model to the server
   * @param options
   */
  save( options ) {

  }

  /**
   * Get a plain representation of the model
   * @param options
   * @returns {*}
     */
  toJSON( options ) {
    return this.models.map(( model ) => {
      return model.toJSON(options);
    });
  }
}

assign(Collection.prototype, {
  model: Model,
  sync
});

/**
 * Add extend method
 */
Collection.extend = extend;

//default export
export default Collection;
