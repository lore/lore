export function hasPartialPair(handler) {
  const hasType = !!handler.actionType;
  const hasState = !!handler.payloadState;
  return (hasType && !hasState) || (hasState && !hasType);
}

export function validatePartialPairs(options) {
  if (hasPartialPair(options.optimistic)) {
    throw new Error(
      'Found definition for only one of optimistic.actionType or ' +
      'optimistic.payloadState. Must define both if you define one.'
    );
  }

  if (hasPartialPair(options.onSuccess)) {
    throw new Error(
      'Found definition for only one of onSuccess.actionType or ' +
      'onSuccess.payloadState. Must define both if you define one.'
    );
  }

  if (hasPartialPair(options.onError)) {
    throw new Error(
      'Found definition for only one of onError.actionType or ' +
      'onError.payloadState. Must define both if you define one.'
    );
  }
}

export default validatePartialPairs;
