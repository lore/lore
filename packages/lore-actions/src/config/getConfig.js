import _ from 'lodash';
import create from '../blueprints/create';
import destroy from '../blueprints/destroy';
import get from '../blueprints/get';
import find from '../blueprints/find';
import refetch from '../blueprints/refetch';
import update from '../blueprints/update';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * Specify whether models should be normalized.
     */

    normalize: true,

    /**
     * Blueprints are used to provide models with a default set of actions for
     * interacting with a REST API. If you want to modify the behavior of those
     * actions you can provide your own implementation here.
     */

    blueprints: {
      create,
      destroy,
      get,
      find,
      refetch,
      update
    },

    /**
     * Determines whether the client-side id (the cid attribute in a model)
     * is sent to the server when creating data. This is not necessary when
     * interacting with REST APIs as the actions can associate the associate
     * the request and response, but when performing optimistic updates using
     * WebSockets it is necessary to send a client-generated ID to the server
     * in order to associate the data created on the client side with the data
     * broadcasted by the server.
     */

    addCidToBody: false,

    /**
     * This field let's you change the name of the cid field sent to the server
     * when performing optimistic updates through WebSockets. By default the
     * property send to the server is called `cid`, matching the name of the attribute
     * on the client-side, but you can change it if you need it to match the API.
     */

    cidBodyAttributeName: 'cid'

  }, configOverride);
}

export default getConfig;
