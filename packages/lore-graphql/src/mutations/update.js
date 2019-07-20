import gql from 'graphql-tag';
import _ from 'lodash';
import json2gql from '../utils/json2gql';

export function updateMutation(modelName, fragments) {
  return function(model, args) {
    return gql`${json2gql({
      mutation: {
        [`update${_.upperFirst(modelName)}`]: {
          __args: {
            where: {
              id: model.id
            },
            data: args
          },
          ...fragments[modelName]
        }
      }
    })}`;
  }
}

export default updateMutation;
