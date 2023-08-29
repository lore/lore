export default function InvalidActionKeyError(key) {
  const error = new Error(
    `There is no action registered for '${key}'`
  );
  error.name = 'InvalidActionKeyError';
  return error;
}
