# lore

[![Build Status][circle-image]][circle-url]

![lore](https://cloud.githubusercontent.com/assets/5898306/13093056/654b5c76-d4c0-11e5-8968-643aae655030.png)


Convention driven framework for React + Redux applications. Heavily opinionated and highly respectful.

### NOT FOR PRODUCTION
**PLEASE NOTE**: Lore is not currently recommended for use in production. It is still in active development, and 
among other reasons, does not yet have built in support for pagination (coming soon). Additionally, the project does not 
yet support a dedicated ES6 experience, which we know many of you will prefer (also coming soon).

### Videos

To help you understand why Lore was created, what problems it's trying to solve, and how it solves them (or plans to 
solve them), please see the following videos.

*Introduction (IN PROGRESS)*:
This video provides a quick introduction to Lore, and touches on some key aspects of framework and the problems it's
trying to solve. It's basically a quick summary of all the other videos mentioned below.

[React Beginner Experience](https://www.youtube.com/watch?v=pfxJ9sebMCc)
This video talks about the beginner experience when getting started with React for the first time, and the things you 
need to learn along the way in order to build an application suitable for production. It's intended to provide a baseline
to point out  what the current experience looks like and what Lore does to improve it. It also calls out the libraries 
that is built on (React, Webpack, Redux, React-Router).

[React Beginner Experience with Lore](https://www.youtube.com/watch?v=vHol_Zu58p8)
This video talks about what Lore does to improve the beginner experience, and make it easier for people to start
developing React applications. It talks some about the design philosophy of the framework, and touches on many aspects
of the project template the framework uses.

*Advanced Experience (IN PROGRESS)*
This video talks about the challenges involved in growing and supporting a large client-side application, and the 
impact that your application's architecture can have on your project's development speed over time.

[Front-end Architecture Challenges](https://www.youtube.com/watch?v=Mm4G_uUl86U)
This video walks through many of challenges you'll face while growing and supporting a large client-side application, 
as well as the implementation that Lore uses (or expects to use) in order to address each of them. This video currently 
covers application *data structure, AJAX abstraction tiers, filtering, pagination, real-time support, visual cues, 
optimistic updates, error handling and 404 pages*. It is currently missing videos for *infinite scrolling, dialogs and 
mulit-step wizards*. Those will be added in the coming days, and this video will be broken up entirely and a dedicated 
page in the documentation will be created for each challenge.
  

### Documentation

You can find the documentation for Lore hosted on Gitbook at https://www.lorejs.org

### Tutorial

While Lore does have a tutorial, at the moment the videos are a far better way to learn about the framework and what it
can do. That being said, [there is an issue](https://github.com/lore/lore/issues/90) created specifically to discuss 
ideas for improving the tutorial, so if you have some, feel free to let me know. The goals for the tutorial are that 
it demonstrates a large number of features in the framework, while highlighting Lore's ability to let you focus on 
React components and not infrastructure. 


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
