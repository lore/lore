# lore

[![Build Status][circle-image]][circle-url]

![lore](https://cloud.githubusercontent.com/assets/5898306/13093056/654b5c76-d4c0-11e5-8968-643aae655030.png)


Convention driven framework for React + Redux applications. Heavily opinionated and highly respectful. Built on 
React, Webpack, Redux and React-Router.


### Orientation

Lore's goal is to provide a framework that makes it easy to build React applications and is capable of supporting a 
mature real-world application. To understand how the framework makes it easier to get started with React, and what
problems it's trying to solve, please see [the intro video on the homepage](http://www.lorejs.org) or through 
[this direct link](https://www.youtube.com/watch?v=u3cK4fz1GNg).

If you're new to React, you may be interested in this video discussing 
[the challenges building a React application from scratch](http://www.lorejs.org/getting-started/building-your-first-react-app/) 
as additional context on how Lore reduces the learning curve for React development.

### Features

There are a lot of demands on front-end applications as they evolve to support the growing demands of the user base. 
Lore's goal is to build support for many of those common feature concerns into the architecture. Below is a list of UI
concerns Lore addresses or is planning to address, linked to their documentation page:

* [Data Structure](http://www.lorejs.org/features/challenges/data-structure/)
* [AJAX Abstration Tier](http://www.lorejs.org/features/challenges/ajax-abstraction/)
* [Filtering](http://www.lorejs.org/features/challenges/filtering/)
* [Pagination](http://www.lorejs.org/features/challenges/pagination/)
* [Infinite Scrolling](http://www.lorejs.org/features/challenges/infinite-scrolling/)
* [WebSockets (real-time)](http://www.lorejs.org/features/challenges/websockets/)
* [Visual Cues](http://www.lorejs.org/features/challenges/visual-cues/)
* [Optimistic Updates](http://www.lorejs.org/features/challenges/optimistic-updates/)
* [Dialogs](http://www.lorejs.org/features/challenges/dialogs/)
* [Wizards](http://www.lorejs.org/features/challenges/wizards/)
* [Error Handling](http://www.lorejs.org/features/challenges/error-handling/)
* [404 Pages](http://www.lorejs.org/features/challenges/404-pages/)


### Documentation

The documentation for Lore is hosted at http://www.lorejs.org.


### Tutorial

At the moment the videos are a far better way to learn about the framework and what it
can do. That being said, there are issues created specifically to discuss ideas for improving 
the tutorials.

* [Beginner](https://github.com/lore/lore/issues/101)
* [Intermediate](https://github.com/lore/lore/issues/102)
* [Advanced](https://github.com/lore/lore/issues/103)


### Near-term Focus

Since Lore is still in active development, I'm going to list the things that have immediate focus here.

1. [[done](https://github.com/lore/lore/pull/120)] Improve support for launching dialogs
2. [[bootstrap](https://github.com/lore/lore/pull/120),[material-ui](https://github.com/lore/lore/pull/122)] Provide a set of convention-generated dialogs for basic CRUD operations
3. [[done](https://github.com/lore/lore/pull/124)] Add support for setting custom headers on network requests
4. [[done](https://github.com/lore/lore/pull/127)] Create lore-auth package to simplify authentication and authorization concerns
5. [[done](https://github.com/lore/lore/pull/126)] Create hook for supporting WebSockets with Sails backend
6. Create hook for supporting WebSockets with Rails 5 backend (using ActionCable)
7. Create authentication example
8. Create WebSockets example


### Thanks
* [React](https://github.com/facebook/react) for a brilliant componentization library for JavaScript.
* [Redux](https://github.com/reactjs/redux) for a simple and expressive React architecture.  
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)/[React Transform](https://github.com/gaearon/react-transform-boilerplate) 
for making UI development a more fun and magical experience (even if it is [about to be sunset](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)).
* [Sails](https://github.com/balderdashy/sails) for showing that a framework can be both strongly opinionated and highly respectful.
* [Rincon Strategies](http://www.rinconstrategies.io) for creating a React community in Tucson and for always building 
apps that emphasize the importance of the user experience. I’m constantly learning :)
* [Storcery](http://storcery.io) for providing the environment, discussion and impetus that gave birth to Lore.
* [April Zero](http://aprilzero.com) for showing just how beautiful web apps can be.  Your creation continues to inspire.
* [Backbone](https://github.com/jashkenas/backbone) for a wonderfully well-thought-out interface for an API abstraction tier.
* [Redux-Auth-Wrapper](https://github.com/mjrussell/redux-auth-wrapper) for demonstrating a simple and expressive way to handle authentication and authorization concerns. 


[circle-url]: https://circleci.com/gh/lore/lore
[circle-image]: https://circleci.com/gh/lore/lore.svg?style=shield&circle-token=6ef9571387d0e08d802f6769026fcf91fc30459f
