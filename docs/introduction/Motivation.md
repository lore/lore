# Motivation

In many ways, it's a great time to be a JavaScript developer.  New tooling is being built that simplifies front-end
development (React, Redux). Universal apps/frameworks are coming out that merge client and server code together to
create a single experience that helps address concerns like first page load response time, code duplication, and the
congnative overhead of developing in multiple languages with different ecosystems. Build tools are becoming simpler
and more powerful (Webpack).  Projects are being more considerate of different environments, and breaking apart their 
libraries to be more generic and widely applicable (decoupling engines from framework like redux-react and react-dom to
supprt usage in native mobile apps). And native support for JavaScript in mobile apps is emerging!  All very cool stuff.
 
The problem with all of the awesomeness, and all of the consideration and architectural purity, is that you're left to
develop your own opinions.  So you take all of these amazing libraries, and then decide which ones you want, and then
you have to learn how to combine then together, and then, eventually, after a lot of learning and copy/pasting from
various examples, you eventually get something working, and then you have to decide out where to deploy it (Surge, 
GitHub Pages, setup a server on Heroku?), set of SSL or not, if you're deploying to gh-pages how to do you configure
gulp/grunt to build a subtree and publish to your repo...it all gets really exhausting.  Just to build and deploy a
simple app.

```
My favorite React/Redux/Flux problem is the one where the browser enters an infinite loop and crashes.
 -Jason Hansen making up quotes for Mike Groseclose
```

But then your app gets more complex. You build a server, set up an API, and now you need to start consuming data. But
because everything in the ecosystem is awesome and architectural pure and unopinionated, you also have to decide how
you want to do that too.  And if there's one place the ecosystem is currently REALLY avoiding having a strong opinion 
on, it's how you store your data and setup your AJAX tier for your application to consume and create data. If you're an
experienced developer, with a few apps behind you, this might not be so bad.  But if you're just started out, making
your first or second app, there are a LOT of ways to do this badly, and to wrap your app into a confusing knot that's
difficult to follow and not very flexible to change.

But now you've figured all that out, you're happy, and everything is awesome (again).  But then your application
takes off, and people use it, but maybe you didn't build in a team system.  And people are really wanting to invite
people to join their project.  So you're like "Okay, whatever, I'll build teams in.  People are asking for it, and I
like building things that bring my customers joy". So you build it!  And it's great!  Only apps that involve
collaboration also let people change data on the same page, and now people are modifying things other people are
looking at!  Oh man, that's tough.  But that's cool, there's this thing called real-time and socket.io, and it lets
you create an experience where people feel like they're working on the same page together.  It's great.  And then you
start to integrate it, and things get difficult again.  How do you integrate real-time support into your application
in a way that can seamlessly live alongside your existing REST infrastructure?  Do you start duplicating code to
support it?

What are good patterns to handle pagination?

What about launching dialogs?

Optimistic modification of data is great (showing data as changed on the client side before the server confirms it) but
what it the request fails on the server side?  How do you roll the change back, or better yet how do you notify the
user and give them the opportunity to try again or at least copy the data from the text box they just spent the last 20
minutes filling out so you don't ruin their day?

What if I'm creating a wizard, and I need a modal dialog to stay open, and show a spinner, until the server confirms
the data has been created for that step so the user can move onto the next step?

How do I log user activity?  What if I need to report message and track usage patterns?  What services can I integrate
with?  What are good patterns to do that?  Where does that code fit into the architecture?

So yeah, it is a GREAT time to be a JavaScrict developer. But it can also be really exhausting.  A lot of the 
ecosystem right now is BYOO (Bring Your Own Opinions).  And, it turns out we have a lot of opinions.  And some of 
the opinions we believe are less arbitrary preference and more like best practices.  They are the things we reach 
for, and re-build in every project.  The things we've refined over time, and found to be so close but quite right. The
things we've found to be difficult to grasp or understand for less experienced developers but also had an excessive 
cognitive overhead for experienced developers.  Ways to do real-time well and ways to do it badly. And for React apps,
there are ways to architecture your project that make certain use cases (like waiting for server confirmation before
proceeding to the next step) impossible to achieve without hacking around the architecture or doing a full re-write.

This framework is the manifestation of that experience.  It is all the opinions we've collected and refined over years
of building [single-page applications](https://en.wikipedia.org/wiki/Single-page_application).  It was built to remove
boilerplate from projects, prevent copy-pasting, and allow developers to focus on the true view tier of their application
(the components and look and feel of the site, not data management or architectural considerations and discussions and
refactoring).

It is focused on:
* The web.  The land of browsers.  Eventually the framework may also break apart to support native/mobile applications
and universal applications (to be as awesome as all the other great libraries), but it's primary focus is to support 
single-page applications running in browsers.
* Replacing boilerplate actions and reducers with convention-based magic (boilerplate = similarities between standard
CRUD operations for all actions and reducers)
* Simplifying dialog management and a data-flow approach that enables complex multi-step wizards
* Seamless integration of real-time support for applications (you can add it later when you need to and know it'll work)
* Bringing opinionated best-practices into the framework but providing overrides for all the opinions just in case your
opinions are bestER-practice.
* (eventually) Logging and analytics integration so you can track user behavior, build a better app through metrics,
and ultimately bring more joy to your users
* (eventually) Other stuff?

