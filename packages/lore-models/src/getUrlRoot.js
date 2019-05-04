import _pluralize from 'pluralize';
import applyCasingStyle from './applyCasingStyle';


export default function getUrlRoot(modelName, config) {
  const { apiRoot, pluralize, casingStyle } = config;
  let { endpoint } = config;

  // if the user did not provide a custom endpoint, generate
  // one from the model name
  if (!endpoint) {
    endpoint = pluralize ?
      applyCasingStyle(casingStyle, _pluralize(modelName)) :
      applyCasingStyle(casingStyle, modelName);
  }

  return apiRoot ? `${apiRoot}/${endpoint}` : endpoint;
}
