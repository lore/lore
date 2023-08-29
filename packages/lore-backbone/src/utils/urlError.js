// Throw an error when a URL is needed, and none is supplied.
export default function urlError() {
  throw new Error('A "url" property or function must be specified');
}
