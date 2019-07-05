export const defaultOptions = {
  model: null,
  collection: null,
  actionTypes: {
    optimistic: null,
    onSuccess: null,
    onError: null
  },
  payloadStates: {
    optimistic: null,
    onSuccess: null,
    onError: null
  },
  addCidToBody: false,
  cidBodyAttributeName: 'cid'
};

export default defaultOptions;
