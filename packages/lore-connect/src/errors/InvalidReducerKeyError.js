export default function InvalidReducerKeyError(key) {
  const error = new Error(
    `There is no reducer registered for '${key}'`
  );
  error.name = 'InvalidReducerKeyError';
  return error;
}
