import {type} from "./constants";
import axios from "axios";
import result from "lodash.result";

/**
 * The lore.models "sync" function does all the heavy lifting of communicating with the server
 * @param method
 * @param model
 * @param options
 */
export default function sync( method, model, options = {} ) {

  //build our params
  let params = {type: method, url: options['url'] || model['url']};

  //check for URL
  if ( !params.url ) {
    throw new Error("An url must be provided in the model or the options for lore.models.sync")
  }

  //determine the correct XHR type
  let xhr;
  switch ( params.type ) {
    case type.GET:
      xhr = axios.get;
      break;
    case type.POST:
      xhr = axios.post;
      break;
    case type.PUT:
      xhr = axios.put;
      break;
    case type.DELETE:
      xhr = axios.delete;
      break;
  }

  //add a payload for PUT and POST requests
  let payload;
  if ( params.type === type.POST || params.type === type.PUT ) {
    payload = JSON.stringify(options.attrs || model.toJSON(options));
  }

  //make the naive call
  return xhr(result(params, 'url'), payload);

};
