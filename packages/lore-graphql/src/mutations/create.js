import gql from 'graphql-tag';
import _ from 'lodash';
import json2gql from '../utils/json2gql';

export function createMutation(modelName, fragments) {
  return function(args) {
    return gql`${json2gql({
      mutation: {
        [`create${_.upperFirst(modelName)}`]: {
          // __args: {
          //   text: args.text,
          //   user: {
          //     connect: {
          //       id: args.userId
          //     }
          //   }
          // },
          __args: args,
          ...fragments[modelName]
        }
      }
    })}`;
  }
}

export default createMutation;
