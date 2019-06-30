/**
 * Configuration file for postcss, a webpack loader for transforming styles using JS plugins.
 *
 * https://github.com/postcss/postcss
 *
 * Plugins can be used to lint your CSS, automatically include vendor prefixes, add support for
 * variables and mixins, transpile future CSS syntax, inline images, and more.
 */

module.exports = {
  plugins: [

    /**
     * Autoprefixer is a plugin to add vendor prefixes to CSS rules using values from Can I Use
     *
     * https://github.com/postcss/autoprefixer
     */

    require('autoprefixer')({
      /* ...options... */
    })
  ]
};
