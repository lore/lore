import {type} from "./constants";
import axios from "axios";
import _assign from "lodash.assign";
import _result from "lodash.result";

/**
 * The lore.models "sync" function does all the heavy lifting of communicating with the server
 * @param method
 * @param model
 * @param options
 */
export default function sync( method, model, options = {} ) {

  //get our url
  let params = {type: method, url: options['url'] || model['url']};

  //check for URL
  if ( !params.url ) {
    throw new Error("An url must be provided in the model or the options for lore.models.sync")
  }

  //create a payload for PUT and POST requests
  let payload;
  if ( params.type === type.POST || params.type === type.PUT ) {
    payload = options.attrs || model.toJSON(options);
  }

  //build config object
  let config = {
    url: _result(params, 'url'),
    method: params.type,
    headers: options.headers,
    data: payload
  }

  //override config with passed in options
  return axios(_assign(config, options));

};
