# Upgrade guide for v0.12 - v0.13

## Purpose
This README describes the changes you'll need to make when upgrading from Lore v0.11 to Lore v0.12, and this
directory contains copies of all of the core files that have been changed.

The easiest way to upgrade might be to create a new project (using the v0.12 version of the CLI) and then:

1. Copy your `/src` directory into the new project
2. Modify the settings in `/config` to match your project settings
3. Add your routes back to `routes.js`
4. Add missing packages to `package.json`

But if you would prefer to upgrade your project in-place, all required changes are described below.

> You can also overwrite the files in your existing project by creating a new project on top of it
> using the command `lore new <project name> --force`, but this may be the most difficult approach
> as it requires you to look at the git diff to create a version of the file that includes the new
> as well as your own changes.

## .now
v0.13 includes support for now.sh in new projects, as a recommended deploy host. If you want to try it out,
copy the `.now` directory in this folder into the root of your project.

## package.json
There are several packages that need to be added or updated. The changes will be broken out into
`dependencies` and `devDependencies`.

### dependencies

All Lore-related packages need to be updated to v0.13:

```json
"lore": "~0.13.0",
"lore-auth": "~0.13.0",
"lore-hook-actions": "~0.13.0",
"lore-hook-auth": "~0.13.0",
"lore-hook-bind-actions": "~0.13.0",
"lore-hook-collections": "~0.13.0",
"lore-hook-connect": "~0.13.0",
"lore-hook-connections": "~0.13.0",
"lore-hook-dialog": "~0.13.0",
"lore-hook-models": "~0.13.0",
"lore-hook-react": "~0.13.0",
"lore-hook-reducers": "~0.13.0",
"lore-hook-redux": "~0.13.0",
"lore-hook-router": "~0.13.0",
"lore-utils": "~0.13.0",
```

Additionally you need to add or update the following packages related to React and Redux:

```json
"prop-types": "^15.6.0",
"react": "^16.1.1",
"react-dom": "^16.0.0"
```

And finally, if you're using `createReactClass` in your code, you'll need to add the `create-react-class` package:

```json
"create-react-class": "^15.6.2",
```

### devDependencies

Update the version of `json-server` being used (if it's still in your project):

```
"json-server": "~0.12.1",
```

Then update the packages related to Redux DevTools:

```json
"redux-devtools": "^3.4.1",
"redux-devtools-dock-monitor": "^1.1.3",
"redux-devtools-log-monitor": "^1.4.0"
```

Finally, update Webpack to v3, and add or update the following related packages:

```json
"extract-text-webpack-plugin": "^3.0.2",
"favicons-webpack-plugin": "~0.0.7",
"webpack": "^3.11.0",
"webpack-manifest-plugin": "^1.1.0"
```

### scripts

Lore v0.13 updates the scripts and webpack config so that you can independently control which environment the 
application is configured for (development, staging, production, etc) and how the code is built (e.g. minified for 
production).

Modify the `scripts` section of your `package.json` file to look like this:

```json
"build": "npm run build:development",
"build:development": "npm run clean && webpack --env.webpack=production --env.lore=development",
"build:production": "npm run clean && webpack --env.webpack=production --env.lore=production -p",
"deploy": "npm run now:copy && now dist",
"deploy:production": "npm run build:production && npm run deploy",
"clean": "rimraf dist",
"now:copy": "cp .now/package.json dist/package.json",
"server": "json-server --watch db.json --port=1337",
"start": "webpack-dev-server --hot --env.webpack=development --env.lore=development",
"stats": "npm run stats:development",
"stats:development": "webpack --json --env=development > stats.json",
"stats:production": "webpack --json --env=production -p > stats.json",
"test": "echo \"Error: no test specified\" && exit 1"
```


## Webpack

This release upgrades Webpack to v3, and adds support for hosting the application from a basename, 
like `https://www.example.com/application`, as well running the development server on a remote machine with
custom SSL certificates.

To update your webpack configuration, replace the contents of the `webpack.config.js` file at the root of the 
project with the template contained in this folder.


## index.html

This release provides support for a "loading experience" that hides the application until you're ready for the
user to interact with it, and then "fades in" to the application.

To make sure your application loads correctly, you will need to update the `index.html` file in your project to 
resemble the template in this guide.


## index.js

Lore v0.13 imports a css file within `index.js` to support the "loading experience". To make sure it displays 
correctly, you will need to update the `index.js` file in your project to resemble the template in this guide.

## Assets

Several assets files have been created for v0.13, to support the "loading experience".

### [new] assets/css/loading-screen.js

This a new file. Copy it from the template in this guide.

### [new] assets/less/loading-screen.js

This a new file. Copy it from the template in this guide.

### [new] assets/sass/loading-screen.js

This a new file. Copy it from the template in this guide.

## Config

Several config files have been updated for v0.13.

### [new] config/env/development.js

The included comments have been updated.

### [new] config/env/production.js

The included comments have been updated.

### config/connect.js

v0.13 includes new blueprints, and the included comments have been updated to reflect that.

### config/connections.js

The included comments have been updated.

### config/router.js

v0.13 includes the ability to server the project from a "basename" (a nested URL). This file has been updated to
support that.

## Src

Several files in the src directory have been added or updated.

### src/components/Layout.js

This file has been updated. Copy it from the template in this guide.

### src/components/Master.js

This file has been updated to support the "loading experience". Copy the changes from the template in this guide.

### src/components/RemoveLoadingScreen.js

This file is new. Copy it from the template in this guide.

### src/components/ShowLoadingScreen.js

This file is new. Copy it from the template in this guide.

### src/constants/ActionTypes.js

This file has been updated. Copy the changes from the template in this guide.

### src/constants/PayloadTypes.js

This file has been updated. Copy the changes from the template in this guide.

### src/decorators/UserIsAuthenticated.js

This file has been updated. Copy it from the template in this guide.

### src/decorators/UserIsAuthorized.js

This file has been updated. Copy it from the template in this guide.

### src/utils/auth.js

This file has been updated. Copy it from the template in this guide.

### src/utils/storageAvailable.js

This file has been updated. Copy it from the template in this guide.
