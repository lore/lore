export default function payload(model, state, error) {
  return {
    id: model.id,
    cid: model.cid,
    state: state,
    error: error || {},
    data: model.toJSON()
  };
}
