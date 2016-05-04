# lore

[![Build Status][circle-image]][circle-url]

![lore](https://cloud.githubusercontent.com/assets/5898306/13093056/654b5c76-d4c0-11e5-8968-643aae655030.png)


Convention driven framework for React + Redux applications. Heavily opinionated and highly respectful. Built on 
React, Webpack, Redux and React-Router.

### NOT FOR PRODUCTION
**PLEASE NOTE**: Lore is not currently recommended for use in production. It is still in active development, and 
among other reasons, does not yet have built in support for pagination (coming soon). Additionally, the project does not 
yet support a dedicated ES6 experience, which we know many of you will prefer (also coming soon).

### Videos: Beginner Experience

Lore's goal is to provide a framework that makes it easy to build React applications and is capable of supporting a 
mature real-world application. To understand how the framework makes it easier to get started with React, and what
problem it's trying to solve for beginners, please see the following videos:

[Challenges building a React application today from scratch](https://www.youtube.com/watch?v=pfxJ9sebMCc)

[How Lore makes it easier to get started with React](https://www.youtube.com/watch?v=vHol_Zu58p8)


### Videos: Advanced Experience

There are a lot of demands on front-end applications as they evolve to support the growing demands of the user base. 
Lore's goal is to build support for many of those common feature concerns into the architecture. To understand how the
client-side architecture you start with can impact your development speed as your application grows, as well as which 
feature concerns Lore is being architected to solve for, please see the following videos:

*(IN PROGRESS) Impact of your client-side architecture on development progress over time*

[Feature concerns Lore is being build to address](https://www.youtube.com/watch?v=Mm4G_uUl86U)

* [Data Structure](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=1m45s)
* [AJAX Abstration Tier](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=5m38s)
* [Filtering](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=8m45s)
* [Pagination](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=15m14s)
* Infinite Scrolling
* [WebSockets (real-time)](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=18m17s)
* [Visual Cues](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=26m32s)
* [Optimistic Updates](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=30m16s)
* Dialogs
* Wizards
* [Error Handling](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=35m13s)
* [404 Pages](https://www.youtube.com/watch?v=Mm4G_uUl86U&t=37m50s)


### Documentation

The documentation for Lore is hosted at http://www.lorejs.org


### Tutorial

At the moment the videos are a far better way to learn about the framework and what it
can do. That being said, [there is an issue](https://github.com/lore/lore/issues/90) created specifically to discuss 
ideas for improving the tutorial.


### Near-term Focus

Since Lore is still in active development, I'm going to list the things that have immediate focus here.

1. Finish uploading missing videos mentioned above.
2. Clean up docs & give each challenge mentioned in "Advanced Use Cases" a dedicated doc page
3. Upgrade react-router to v2
4. Support ES6 version of the new project template
5. Support ES6 versions of all the generators
6. Add support for pagination


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


[circle-url]: https://circleci.com/gh/lore/lore
[circle-image]: https://circleci.com/gh/lore/lore.svg?style=shield&circle-token=6ef9571387d0e08d802f6769026fcf91fc30459f
