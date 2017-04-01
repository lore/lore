# Upgrade guide for v0.11 - v0.12

## Purpose
This README describes the changes you'll need to make when upgrading from Lore v0.11 to Lore v0.12, and this
directory contains copies of all of the core files that have been changed.

The easiest way to upgrade is to create a new project (using the v0.12 version of the CLI) and then:

1. Copy your `/src` directory into the new project
2. Modify the settings in `/config` to match your project settings

But if you would prefer to upgrade your project in-place, all required changes are described below.

## package.json
There are several packages that need to be added or updated. The changes will be broken out into
`dependencies` and `devDependencies`.

### dependencies

All Lore-related packages need to be updated to v0.12:

```json
"lore": "~0.12.0-beta",
"lore-auth": "~0.12.0-beta",
"lore-hook-actions": "~0.12.0-beta",
"lore-hook-auth": "~0.12.0-beta",
"lore-hook-bind-actions": "~0.12.0-beta",
"lore-hook-collections": "~0.12.0-beta",
"lore-hook-connect": "~0.12.0-beta",
"lore-hook-connections": "~0.12.0-beta",
"lore-hook-dialog": "~0.12.0-beta",
"lore-hook-models": "~0.12.0-beta",
"lore-hook-reducers": "~0.12.0-beta",
"lore-hook-redux": "~0.12.0-beta",
"lore-utils": "~0.12.0-beta",
```

Additionally you need to add two new packages for the `react` and `router` hooks:

```json
"lore-hook-react": "~0.12.0-beta",
"lore-hook-router": "~0.12.0-beta",
```

To support normalization, you'll need to add the package `redux-batched-subscribe`:

```json
"redux-batched-subscribe": "^0.1.6",
```

### devDependencies

Lore v0.11 hard-coded the version of babel libraries being used. We're going to change that
in v0.12 and allow the libraries to be updated with newer versions. To make this change, simply
add a `^` at the beginning of the version number for the following packages:

ES5
```json
"babel-cli": "^6.4.5",
"babel-core": "^6.2.1",
"babel-loader": "^6.2.2",
"babel-preset-es2015": "^6.5.0",
"babel-preset-react": "^6.5.0",
```

ES6
```json
"babel-cli": "^6.4.5",
"babel-core": "^6.2.1",
"babel-loader": "^6.2.2",
"babel-plugin-add-module-exports": "^0.2.1",
"babel-preset-es2015": "^6.5.0",
"babel-preset-react": "^6.5.0",
```

ESNext
```json
"babel-cli": "^6.4.5",
"babel-core": "^6.2.1",
"babel-loader": "^6.2.2",
"babel-plugin-add-module-exports": "^0.2.1",
"babel-plugin-transform-class-properties": "^6.10.2",
"babel-plugin-transform-decorators-legacy": "^1.3.4",
"babel-preset-es2015": "^6.5.0",
"babel-preset-react": "^6.5.0",
"babel-preset-stage-1": "^6.22.0",
```

Lore v0.12 adds formal support for a production build configuration. You will need to add the following
webpack plugins to support the build process.

```json
"copy-webpack-plugin": "^4.0.1",
"html-webpack-plugin": "^2.28.0",
"extract-text-webpack-plugin": "^2.1.0",
"progress-bar-webpack-plugin": "^1.9.3",
"webpack-manifest-plugin": "^1.1.0",
```

Lore v0.11 included the `react-hot-loader` package, but the library doesn't work with react-router yet. So let's just
get rid of it until it's supported. *Remove* the `react-hot-loader` package:

```json
"react-hot-loader": "^3.0.0-beta.6",
```

Lore v0.12 integrates the Redux DevTools into the `development` environment by default, and you can enable
them through a config setting. Add the following libraries to support them:

```json
"redux-devtools": "^3.0.0",
"redux-devtools-dock-monitor": "^1.1.1",
"redux-devtools-log-monitor": "^1.2.0",
```

Next update all webpack loaders (and add a few new ones):

```json
"css-loader": "^0.26.2",
"file-loader": "^0.10.1",
"json-loader": "0.5.4",
"less-loader": "2.2.0",
"postcss-loader": "^1.3.3",
"sass-loader": "^6.0.3",
"style-loader": "^0.13.2",
"svg-loader": "0.0.2",
"url-loader": "^0.5.8",
```

Finally, update Webpack to v2, and add or update the following packages:

```json
"webpack": "^2.2.1",
"webpack-config-utils": "^2.3.0",
"webpack-dev-server": "^2.4.1",
```

Finally, add `rimraf`, a cross-platform delete utility, that will allow us to clean out the build directory 
before building the project:
 
```json
"rimraf": "^2.6.1",
```

### scripts

Lore v0.12 introduces a formal build step for production, and also changes the way the application is built 
and served when operating in development mode.

These changes will be described in more detail in the *Webpack* section. For now, modify the `scripts` section of your
`package.json` file to look like this:

```json
"clean": "rimraf dist",
"build": "npm run clean && webpack --env.prod",
"build:prod": "npm run clean && webpack --env.prod -p",
"start": "webpack-dev-server --history-api-fallback --env.dev --hot --port=3000",
"server": "json-server --watch db.json --port=1337",
"test": "echo \"Error: no test specified\" && exit 1"
```


## Webpack

This release upgrades Webpack to v2 and greatly simplifies the default Webpack configuration. Thanks changes in Webpack 2,
and a strategy outlined in a [video series by Kent Dodds](https://egghead.io/courses/using-webpack-for-production-javascript-applications),
it is now possible to specify the entire Webpack config in a single file, and still be able to modify it's behavior
for different environments like development and production.

To update your webpack configuration, perform these actions:

1. Delete the `/webpack` directory at the root of the project.
2. Delete the `server.js` file at the root of the project.
3. Replace the contents of the `webpack.config.js` file at the root of the project with the template contained in this
folder.


## index.html

This release provides formal support for a production configuration, which includes addressing browser concerns like 
cache busting. In order to do that, the HTML tags for styles and bundles are now inserted dynamically using the 
`ExtractTextPlugin` for styles and the `HtmlWebpackPlugin` for bundles and favicons.

To make sure your application loads correctly, you will need to update the `index.html` file in your project to 
resemble the template in this guide.


## postcss.config.js

This release adds [postcss](https://github.com/postcss/postcss) as a CSS preprocessor, which will automatically
inspect your CSS for missing vendor prefixes and add them through the `autoprefixer` plugin.

To leverage this functionality, you need to add a `postcss.config.js` file at the root of your project, which is
how you configure postcss and (if you want) integrate additional plugins for functionality like linting, transpiling 
future CSS syntax, and more.


## index.js

Lore v0.12 introduces two new hooks; `lore-hook-react` and `lore-hook-router`. The relevance of these hook will be
described later. For now, update your `index.js` file to include them in the list of hooks. The final list should
look like this:

```js
lore.summon({
  hooks: {
    auth: require('lore-hook-auth'),
    actions: require('lore-hook-actions'),
    bindActions: require('lore-hook-bind-actions'),
    collections: require('lore-hook-collections'),
    connections: require('lore-hook-connections'),
    connect: require('lore-hook-connect'),
    dialog: require('lore-hook-dialog'),
    models: require('lore-hook-models'),
    react: require('lore-hook-react'),
    reducers: require('lore-hook-reducers'),
    redux: _.extend(require('lore-hook-redux'), {
      dependencies: ['reducers', 'auth']
    }),
    router: require('lore-hook-router')
  }
});
```


## Config

The rest of the changes for v0.12 involve creating or updating config files.

While most of Lore's functionality had already been moved into hooks as of v0.11, there were three areas the Lore core 
still retained control of:

1. The creation of the `redux` Store
2. The creation of the `react-router` Router
3. The creation and mounting of the Root `react` component.

As of this release, all of that functionality has been broken out of the core, moved into hooks, and exposed through
configuration files.

### [new] config/react.js

This config file is new, and gives you control over the creation and mounting of the Root component. Copy the template
into your project.

### config/redux.js

This config file has been modified. Instead of only being able to modify the middleware, you now have full control over
the creation of the Redux store. Copy the template into your project.

### config/env/development.js

This config file has been modified. Now that we can fully control the creation procss through the `react` and `redux` 
config options, the development config has been updated to include the Redux DevTools by default, and provide an easy 
switch to turn them on and off. Copy the template into your project.

### config/actions.js

This config has been modified. It now allows you to turn normalization behavior on or off, as well as override the
default blueprints. Copy the template into your project.

### config/connect.js

This config has been modified. It now allows you to override the default blueprints that `lore.connect` uses to
determine the behavior that should occur when requesting data, as well as which action should be invoked. 
Copy the template into your project.

### config/router.js

This config has been modified. It now allows you to change how the routes are loaded. While not significant on it's own,
this was previously the only config file that didn't map to a real hook. But with the creation of the new 
`lore-hook-router` hook, you can now fully customize which version of `react-router` you use and how the routes are
integrated into the application. Copy the template into your project.
