import gql from 'graphql-tag';
import pluralize from 'pluralize';
import _ from 'lodash';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { PayloadStates } from '@lore/utils';
/**
 * Configuration file for graphql
 *
 * This file is where you define overrides for the default graphql behaviors.
 */

export default {

  /**
   * The set of connections, each representing a different API
   */

  // connections: {
  //   default: {
  //     uri: 'https://us1.prisma.sh/username/service/dev',
  //   }
  // },

  uri: 'https://us1.prisma.sh/username/service/dev',

  fragments: {
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: true,
      endCursor: true,
    },
    aggregate: {
      count: true
    },
    user: {
      id: true,
      nickname: true,
      avatar: true
    },
    tweet: {
      id: true,
      text: true,
      user: {
        id: true,
        nickname: true,
        avatar: true
      },
      createdAt: true
    }
  },

  queries: {
    // tweet: {
    //   find: findQuery('tweet'),
    //   get: getQuery('tweet')
    // },
    // user: {
    //   find: findQuery('user'),
    //   get: getQuery('user')
    // }
  },

  mutations: {
    // tweet: {
    //   create: createMutation('tweet'),
    //   destroy: destroyMutation('tweet'),
    //   update: updateMutation('tweet')
    // },
    // user: {
    //   create: createMutation('user'),
    //   destroy: destroyMutation('user'),
    //   update: updateMutation('user')
    // }
  },

  collections: {
    parse: function(modelName) {
      return function(response) {
        if (!response) {
          return [];
        }

        const data = response[`${pluralize(modelName)}Connection`];

        if (!data) {
          return [];
        }

        this.meta = _.merge({},
          response.totalCount.aggregate,
          data.pageInfo
        );

        return data.edges.map(function(edge) {
          return edge.node;
        });
      }
    }
  },

  models: {
    parse: function(modelName) {
      return function(response) {
        if (!response) {
          return {};
        }

        return response[modelName] || {};
      }
    }
  },

  getState: function(loading, error) {
    if (loading) {
      return PayloadStates.FETCHING;
    }

    if (error) {
      return PayloadStates.ERROR_FETCHING;
    }

    return PayloadStates.RESOLVED;
  }

};
