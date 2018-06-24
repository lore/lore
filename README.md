# lore

[![Build Status][circle-image]][circle-url] [![Slack Status][slackin-image]][slackin-url]

![lore](https://cloud.githubusercontent.com/assets/5898306/13093056/654b5c76-d4c0-11e5-8968-643aae655030.png)


Convention driven framework for building front-end applications using React/Redux. Heavily opinionated and highly respectful. Built on React, Webpack, Redux and React-Router.


### Orientation

Lore's goal is to provide a framework that makes it easy to build React applications and is capable of supporting a 
mature real-world application. To understand how the framework makes it easier to get started with React, and what
problems it's trying to solve, please see [the intro video on the homepage](http://www.lorejs.org) or through 
[this direct link](https://www.youtube.com/watch?v=u3cK4fz1GNg).

If you're new to React, you may be interested in this video discussing 
[the challenges building a React application from scratch](http://www.lorejs.org/videos/your-first-react-app/) 
as additional context on how Lore reduces the learning curve for React development.

### Features

There are a lot of demands on front-end applications as they evolve to support the growing demands of the user base. 
Lore's goal is to build support for many of those common feature concerns into the architecture. Below is a list of UI
concerns Lore addresses or is planning to address, linked to their documentation page:

* [Data Structure](http://www.lorejs.org/features/data-structure/)
* [AJAX Abstration Tier](http://www.lorejs.org/architecture/ajax/ajax-abstraction/)
* [Filtering](http://www.lorejs.org/features/filtering/)
* [Pagination](http://www.lorejs.org/features/pagination/)
* [Infinite Scrolling](http://www.lorejs.org/features/infinite-scrolling/)
* [WebSockets (real-time)](http://www.lorejs.org/features/websockets/)
* [Visual Cues](http://www.lorejs.org/features/visual-cues/)
* [Optimistic Updates](http://www.lorejs.org/features/optimistic-updates/)
* [Dialogs](http://www.lorejs.org/features/dialogs/)
* [Wizards](http://www.lorejs.org/features/wizards/)
* [Error Handling](http://www.lorejs.org/features/error-handling/)
* [404 Pages](http://www.lorejs.org/features/404-pages/)


### Documentation

The documentation for Lore is hosted at http://www.lorejs.org.


### Tutorial

There is a [tutorial for learning Lore](http://www.lorejs.org/quickstart/) on the website. It covers:

* Creating a new application
* Laying out your application visuals with mock data
* Routing
* Fetching data from an API server
* Populating your application with real data
* Generating and launching dialogs
* Authentication (logging users in)
* Authorization (restricting what users see)
* Resolving breaking API changes
* Pagination
* Infinite Scrolling
* Filtering data
* Normalizing API data
* Optimistic updates (displaying changes before server confirmation)
* Integrating Websockets for real-time behavior
* Building and publishing your application


### Discussion
If you have any questions, feel free to [create an issue](https://github.com/lore/lore/issues/new). If you'd rather discuss over chat, there is a [Lore Slack Team](https://lorejs.slack.com) which you can join [using this link][slackin-url].


### Forms & Dialogs

While Lore provides a solution to create the types of experiences required of forms and dialogs, through its data structure and support for optimistic updates (such as detecting when a specific resource has suceeded or failed at being created, updated or deleted), the framework itself doesn't provide a direct solution for _creating_ forms and dialogs, as too much about them is specific to the unique branding and experience requirements of an application.

There is however a related repository called [lore-forms](https://github.com/lore/lore-forms), that documents an approach for building forms and dialogs that you may like. To see if it appeals to you, you can follow the [form construction tutorial](http://www.lorejs.org/forms/pattern/) on the website that builds up the patterns used by `lore-forms` from scratch.

You can find more documentation about `lore-forms` on the website at [this link](http://www.lorejs.org/forms/).


### Near-term Focus

Since Lore is still in active development, I'm going to list the things that have immediate focus here.

1. [[done](https://github.com/lore/lore/pull/168)] Simplify ability to extend `lore-hook-connect` with new blueprints and mappings (v0.12.3)
2. [done] Add Quickstart section to display new tweets at top of Feed ([website link](http://www.lorejs.org/quickstart/optimistic/overview/))
3. [done] Add Quickstart section to connect WebSockets for real-time behavior ([website link](http://www.lorejs.org/quickstart/optimistic/overview/))
4. [[done](https://github.com/lore/lore/commit/1861f379faad984326682df89a6f726f613872e8)] Update `lore` to load initializers _after_ hooks (v0.12.4)
5. [[done](https://github.com/lore/lore/pull/169)] Update all packages to ES6 syntax (import, export, const, let)
6. [[done](https://github.com/lore/lore/pull/169)] Update all packages to supply a `module` export for tree-shaking
7. [[done](https://github.com/lore/lore/pull/172)] Break out form-related packages into their own repo called [lore-forms](https://github.com/lore/lore-forms)
8. [done] Update connect blueprints to more easily support uses cases like getting all data and merging local data with paginated data
9. [done] Replace references to `React.PropTypes` with `react-prop-types`
10. [done] Replace references to `React.createClass` with `react-create-class`
11. [done] Overhaul Quickstart (new steps, better patterns, better flow)
12. [done] Publish v0.13
13. [[done](https://github.com/lore/lore-quickstart-es5-v0.13)] Generate `es5` repo for Quickstart with branches for each step
14. [in-progress] Generate `es6` repo for Quickstart with branches for each step
15. Generate `esnext` repo for Quickstart with branches for each step
16. Generate repo for Custom Hook Tutorial with branches for each step
17. Generate repo for Form Pattern Construction Tutorial with branches for each step
18. Send out Newsletter


### Note about React Hot Reloading

Dan Abramov's [Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs) talk from React Europe 2015 demonstrated an incredible (and unique) value proposition for Redux and the functional programming concepts it uses as a foundation. That functionality has since been packaged into a library called [react-hot-loader](https://github.com/gaearon/react-hot-loader), which has gone through two major versions, with the beta version for v3 currently in development.

While there are tutorials that demonstrate how to obtain that functionality in React applications ([webpack tutorial](https://webpack.js.org/guides/hmr-react/), [react-hot-loader tutorial]()) the library itself [does not currently work with react-router](https://github.com/gaearon/react-hot-loader/issues/449), which is why it's not included as part of the development environment for Lore.

Once those issues are resolved, Lore will investigate including it as a default development behavior, similar to the way the Redux DevTools are included by default starting in `v0.12`.


### Thanks
* [React](https://github.com/facebook/react) for a brilliant componentization library for JavaScript.
* [Redux](https://github.com/reactjs/redux) for a simple and expressive React architecture.  
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)/[React Transform](https://github.com/gaearon/react-transform-boilerplate) 
for making UI development a more fun and magical experience (even if it is [about to be sunset](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)).
* [Sails](https://github.com/balderdashy/sails) for showing that a framework can be both strongly opinionated and highly respectful.
* [Lerna](https://github.com/lerna/lerna/) for providing a sane solution for managing a monorepo.
* [Storcery](http://storcery.io) for providing the environment, discussion and impetus that gave birth to Lore.
* [April Zero](http://aprilzero.com) for showing just how beautiful web apps can be.  Your creation continues to inspire.
* [Backbone](https://github.com/jashkenas/backbone) for a wonderfully well-thought-out interface for an API abstraction tier.
* [Redux-Auth-Wrapper](https://github.com/mjrussell/redux-auth-wrapper) for demonstrating a simple and expressive way to handle authentication and authorization concerns. 


[circle-url]: https://circleci.com/gh/lore/lore
[circle-image]: https://circleci.com/gh/lore/lore.svg?style=shield&circle-token=6ef9571387d0e08d802f6769026fcf91fc30459f
[slackin-image]: https://lorejs-slack.herokuapp.com/badge.svg
[slackin-url]: https://lorejs-slack.herokuapp.com
