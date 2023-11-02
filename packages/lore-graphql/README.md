# @lore/graphql

# Random Notes

## config/graphql.js

```
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
```

## index.js

```
/*
 * Apollo
 *
 * Set up the Apollo client
 */

import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://us1.prisma.sh/jason-hansen-79e865/lore-tutorial-graphql/dev'
  }),
  cache: cache
});

window.cache = cache;


/*
 * GraphQL
 *
 * Get queries and mutations
 */

import { getQueries, getMutations } from './.lore/graphql';

const queries = getQueries(config);
const mutations = getMutations(config);


/*
 * React
 *
 * Establish the root component and render it to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfigContext } from '@lore/config';
import { ConnectProvider } from '@lore/connect';
import { GraphQLProvider } from '@lore/graphql';
import { ApolloProvider } from 'react-apollo-hooks';
import routes from './routes';

const domElementId = 'root';

ReactDOM.render((
  <ConfigContext.Provider value={config}>
    <GraphQLProvider client={client} mutations={mutations} queries={queries}>
      <ConnectProvider
        store={store}
        actions={actions}
        blueprints={config.connect.blueprints}
        reducerActionMap={config.connect.reducerActionMap}
      >
        <BrowserRouter basename={__BASENAME__}>
          {routes}
        </BrowserRouter>
      </ConnectProvider>
    </GraphQLProvider>
  </ConfigContext.Provider>
), document.getElementById(domElementId));
```

## package.json

```
{
  "name": "lore-tutorial-v0.14",
  "private": true,
  "version": "0.0.0",
  "description": "A Lore application",
  "keywords": [],
  "scripts": {
    "build": "npm run build:development",
    "build:development": "npm run clean && webpack --env.webpack=production --env.lore=development",
    "build:production": "npm run clean && webpack --env.webpack=production --env.lore=production -p",
    "clean": "rimraf dist",
    "deploy": "now",
    "deploy:production": "npm run build:production && npm run deploy",
    "server": "json-server --watch db.json --port=1337",
    "start": "webpack-dev-server --hot --env.webpack=development --env.lore=development",
    "stats": "npm run stats:development",
    "stats:development": "webpack --json --env=development > stats.json",
    "stats:production": "webpack --json --env=production -p > stats.json",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "apollo-cache-inmemory": "^1.6.1",
    "apollo-client": "^2.6.1",
    "apollo-link-http": "^1.5.14",
    "auth0-js": "^9.10.4",
    "graphql": "^14.3.1",
    "graphql-tag": "^2.10.1",
    "json-to-graphql-query": "^1.9.0",
    "lodash": "^4.0.0",
    "moment": "^2.24.0",
    "pluralize": "^8.0.0",
    "prop-types": "^15.6.0",
    "query-string": "^6.2.0",
    "react": ">=16.8.0",
    "react-apollo-hooks": "^0.4.5",
    "react-dom": ">=16.8.0",
    "react-router-dom": "^5.0.0",
    "redux": "^4.0.1",
    "redux-batched-subscribe": "^0.1.6",
    "redux-thunk": "^2.3.0",
    "webpack-requiredir": "~0.2.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/plugin-proposal-decorators": "^7.0.0",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.4.3",
    "babel-loader": "^8.0.0",
    "copy-webpack-plugin": "^5.0.3",
    "css-loader": "^2.0.1",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^2.0.0",
    "html-webpack-plugin": "4.0.0-alpha.2",
    "json-server": "~0.15.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "node-sass": "^4.1.1",
    "now": "^15.0.0",
    "postcss-loader": "^3.0.0",
    "progress-bar-webpack-plugin": "^1.11.0",
    "redux-devtools": "^3.4.1",
    "redux-devtools-dock-monitor": "^1.1.3",
    "redux-devtools-log-monitor": "^1.4.0",
    "rimraf": "^2.6.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^2.0.0",
    "webapp-webpack-plugin": "^2.4.0",
    "webpack": "^4.19.1",
    "webpack-cli": "^3.1.2",
    "webpack-config-utils": "^2.3.0",
    "webpack-dev-server": "^3.1.14",
    "webpack-manifest-plugin": "^2.0.4"
  }
}
```

## Usage

```
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@lore/graphql';
import { parse, stringify } from 'query-string';
import { EnumType } from 'json-to-graphql-query';
import PayloadStates from '../constants/PayloadStates';
import Tweet from './Tweet';
import PaginationLinks from './PaginationLinks';

export default function Feed(props) {
  const { location } = props;

  const perPage = 5;
  const page = Number(parse(location.search).page || 1);

  const tweets = useQuery('tweet.find', {
    // where: {
    //   // text_contains: 'Unimaginable'
    //   text_contains: ' '
    // },
    first: 5,
    skip: perPage * (page - 1),
    orderBy: new EnumType('createdAt_DESC')
  });

  if (tweets.state === PayloadStates.FETCHING) {
    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <div className="loader"/>
      </div>
    );
  }

  return (
    <div className="feed">
      <h2 className="title">
        Feed
      </h2>
      <ul className="media-list tweets">
        {tweets.data.map((tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        })}
      </ul>
      <PaginationLinks
        tweets={tweets}
        page={page}
        perPage={perPage}
      />
    </div>
  );
}
```
