export const getFileFromContext = function(context, fallback) {
  const result = context.keys().map(fileName => {
    const module = context(fileName);

    // Babel hack, required to get ES5 and ES6 to place nice together
    // by extracting the module from .default per Babel 6 behavior
    if (module.default && module.__esModule) {
      return module.default;
    }

    return module;
  });

  return result[0] || fallback;
};
