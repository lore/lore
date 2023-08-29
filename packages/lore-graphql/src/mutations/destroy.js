import gql from 'graphql-tag';
import _ from 'lodash';
import json2gql from '../utils/json2gql';

export function destroyMutation(modelName, fragments) {
  return function(model) {
    return gql`${json2gql({
      mutation: {
        [`delete${_.upperFirst(modelName)}`]: {
          __args: {
            where: {
              id: model.id
            }
          },
          ...fragments[modelName]
        }
      }
    })}`;
  }
}

export default destroyMutation;
