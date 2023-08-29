import gql from 'graphql-tag';
import pluralize from 'pluralize';
import json2gql from '../utils/json2gql';

export function findQuery(modelName, fragments) {
  return function(args) {
    // return gql`query FIND_TWEETS {${json2gql({
    //   [`${pluralize(modelName)}Connection`]: {
    //     __args: args,
    //     pageInfo : {
    //       ...fragments.pageInfo
    //     },
    //     aggregate: {
    //       ...fragments.aggregate
    //     },
    //     edges: {
    //       node: {
    //         ...fragments[modelName]
    //       }
    //     }
    //   },
    //   totalCount: {
    //     __aliasFor: `${pluralize(modelName)}Connection`,
    //     aggregate: {
    //       ...fragments.aggregate
    //     }
    //   }
    // })}}`;

    return gql`${json2gql({
      query: {
        [`${pluralize(modelName)}Connection`]: {
          __args: args,
          pageInfo : {
            ...fragments.pageInfo
          },
          aggregate: {
            ...fragments.aggregate
          },
          edges: {
            node: {
              ...fragments[modelName]
            }
          }
        },
        totalCount: {
          __aliasFor: `${pluralize(modelName)}Connection`,
          aggregate: {
            ...fragments.aggregate
          }
        }
      }
    })}`;
  };
}

export default findQuery;
