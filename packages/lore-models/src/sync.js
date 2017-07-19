/* eslint no-param-reassign: "off" */

import axios from 'axios';
import _ from 'lodash';
import urlError from './utils/urlError';

// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
const methodMap = {
  create: 'POST',
  update: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
  read: 'GET'
};

/**
 * The lore.models "sync" function does all the heavy lifting of communicating with the server
 * @param method
 * @param model
 * @param options
 */
export default function sync(method, model, options) {
  options = options || {};
  const type = methodMap[method];

  // Default JSON-request options.
  const params = {
    method: type,
    responseType: 'json',
    headers: _.assign({
      'Content-Type': 'application/json'
    }, _.result(model, 'headers'))
  };

  // Ensure that we have a URL.
  if (!options.url) {
    params.url = _.result(model, 'url') || urlError();
  }

  // Ensure that we have the appropriate request data.
  if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
    params.contentType = 'application/json';
    params.data = JSON.stringify(options.attrs || model.toJSON(options));
  }

  // Ensure data is converted to query parameters for a GET request
  if (options.data && method === 'read') {
    options.params = options.data;
    delete options.data;
  }

  // Make the request, allowing the user to override any Ajax options.
  return axios(_.extend(params, options)).then(function(resp) {
    if (options.success) {
      options.success(resp.data, options);
    }
    return resp;
  });
}
