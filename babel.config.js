const { BABEL_ENV } = process.env;

module.exports = function(api) {
  api.cache(true);

  if (BABEL_ENV === 'cjs') {
    return {
      presets: [
        ["@babel/preset-env", {
          modules: "commonjs"
        }],
        "@babel/preset-react"
      ],
      plugins: [
        "add-module-exports"
      ]
    }
  }

  if (BABEL_ENV === 'es') {
    return {
      presets: [
        ["@babel/preset-env", {
          "modules": false
        }],
        "@babel/preset-react"
      ],
      plugins: [
        "lodash"
      ]
    }
  }

  if (BABEL_ENV === 'test') {
    return {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      plugins: [
        "add-module-exports"
      ]
    }
  }

  return {
    presets: [],
    plugins: []
  };
};
