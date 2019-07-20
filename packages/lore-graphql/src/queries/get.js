import gql from 'graphql-tag';
import json2gql from '../utils/json2gql';

export function getQuery(modelName, fragments) {
  return function(args) {
    return gql`${json2gql({
      query: {
        [modelName]: {
          __args: {
            where: {
              id: args.id
            }
          },
          ...fragments[modelName]
        }
      }
    })}`;
  }
}

export default getQuery;
