import buildDictionary from 'webpack-requiredir';
import ActionTypes from './ActionTypes';
import PayloadStates from './PayloadStates';
import payload from './payload';
import payloadCollection from './payloadCollection';
import result from './result';
import getModuleFromContext from './getModuleFromContext';


export {
  ActionTypes,
  PayloadStates,
  payload,
  payloadCollection,
  result,
  getModuleFromContext,
  buildDictionary as buildObjectFromContext
};
