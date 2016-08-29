# Purpose
Provides a set of decorators for handling authentication and authorization concerns within a React application.

# Use Cases
### Authentication
A common need when building React applications is the ability to detect if the user is logged in and redirect them to the login page/experience if they are not.

For this example, pretend we have an application that displays a collection of blog posts for the logged in user. If the user is not logged in (not authenticated) then we want to redirect them to `/login`. If they are authenticated, then we want to display the application as normal.

To accomplish that, we're going to wrap the root component of our application (called `Master`) with a `UserIsAuthenticated` decorator that determines whether the user is logged in. For this example, we're storing a user token in localStorage, so our condition for determining whether the user is logged in is whether that token exists.

```jsx
// file: routes.js
var AuthenticationGenerator = require('lore-auth').generators.AuthenticationGenerator;

var UserIsAuthenticated = AuthenticationGenerator({
  isAuthenticated: function (storeState) {
    return !!localStorage.userToken;
  }
});

// Routes
var Master = require('./src/components/Master');
var Posts = require('./src/components/Posts');
var Login = require('./src/components/Login');
var Logout = require('./src/components/Logout');

module.exports = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route>
      <Route path="/" component={UserIsAuthenticated(Master)}>
        <Route path="posts" component={Posts} />
      </Route>
    </Route>
  </Route>
);
```

### Authorization
Let's say our example application is changed to display a list of posts for _all_ users, but the API only lets users edit their own posts (i.e. posts they created). Translating that concern to the user interface, it means we only want to display the `edit` button if a user is the creator of the post.

```jsx
// file: src/components/Post
// This component will render the EditPostButton component, but we 
// only want that component to be rendered if the user created the Post
var React = require('react');
var EditPostButton = require('./EditPostButton');

module.exports = React.createClass({
  displayName: 'Post',

  propTypes: {
    user: React.PropTypes.object.isRequired,
    post: React.PropTypes.object.isRequired
  },

  render: function () {
    var user = this.props.user;
    var post = this.props.post;

    return (
      <div>
        <h1>{post.data.title}</h1>
        <p>{post.data.text}</p>
        <EditPostButton post={post} user={user} />
      </div>
    );
  }
});
```

```jsx
// file: src/components/EditPostButton
// This component will be wrapped in a custom decorator called 'UserIsPostCreator' that 
// will only display the button if the current user created the post
var React = require('react');
var AuthorizationGenerator = require('lore-auth').generators.AuthorizationGenerator;

var UserIsPostCreator = AuthorizationGenerator({
  wrapperDisplayName: 'UserIsPostCreator',

  propTypes: {
    post: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  isAuthorized: function () {
    var post = this.props.post;
    var user = this.props.user;

    return post.data.creatorId === user.id;
  }
});

module.exports = UserIsPostCreator(React.createClass({
  displayName: 'EditPostButton',

  propTypes: {
    user: React.PropTypes.object.isRequired,
    post: React.PropTypes.object.isRequired
  },

  onEditPost: function() {
    // launch edit dialog...
  },

  render: function () {
    return (
      <button onClick={this.onEditPost}>
        Edit Post
      </button>
    );
  }
}));
```

# Usage

### factories/AuthGeneratorFactory.js
This file provides the component that `generators/AuthenticationGenerator` and `generators/AuthorizationGenerator` use as their foundation. It contains the following methods that can/should be overriden by the generators created from it in order to tailor it's behavior to provide a more semantic interface:

* predicate: function that returns true or false
* onSuccess: function invoked during `componentWillMount` is `predicate` returns true. No-op by default (function does nothing).
* onFailure: function invoked during `componentWillMount` is `predicate` returns false. No-op by default (function does nothing)
* renderSuccess: function invoked during render cycle if `predicate` returns true. By default, this renders the component it decorates, passing down the properties it received
* renderFailure: function invoked during render cycle if `predicate` returns false. By defult, this renders `null`.

### generators/AuthenticationGenerator.js
This file is intended to be used as the foundation for your `UserIsAuthenticated` decorator. It overrides the default methods provided by the `AuthGeneratorFactory` component to provide the following interface:

* isAuthenticated(storeState): should return true if the user is authenticated, otherwise false
* redirectUrl: the url the user should be redirected to if the use is not authenticated

###### Example Usage
```js
var AuthenticationGenerator = require('lore-auth').generators.AuthenticationGenerator;

var UserIsAuthenticated = AuthenticationGenerator({
  isAuthenticated: function (storeState) {
    return !!localStorage.userToken;
  }
});
```

### generators/AuthorizationGenerator.js
This file is intended to be used as the foundation for custom `UserIsX` decorators that determine whether components should be displayed based on some user permission. It overrides the default methods provided by the `AuthGeneratorFactory` component to provide the following interface:

* isAuthorized(storeState): should return true if the user is authorized for the action, otherwise false

If the user is not authorized, the component it wraps will not be rendered, though you could provide a custom component (or pass down additional props) by overriding the `renderFailure` method to change that default.

###### Example Usage
```js
var AuthorizationGenerator = require('lore-auth').generators.AuthorizationGenerator;

var UserIsPostCreator = AuthorizationGenerator({
  wrapperDisplayName: 'UserIsPostCreator',

  propTypes: {
    post: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  isAuthorized: function () {
    var post = this.props.post;
    var user = this.props.user;

    return post.data.creator === user.id;
  }

});
```

### decorators/UserIsAuthorized.js
This file is intended to be used as a generic decorator that will only render the decorated component if the function it takes returns true. It's mostly a conveinance decorator, so you don't neccesarily have to create custom decorators like `UserIsPostCreator` or `UserIsAdmin`.

For example, instead of creating a custom `UserIsPostCreator` decorator as in our example above, we could use this decorator instead like so:

```jsx
var UserIsAuthorized = require('lore-auth').decorators.UserIsAuthorized;

module.exports = UserIsAuthorized(function(props, storeState){
  return props.post.data.creatorId === props.user.id;
})(React.createClass({
  displayName: 'EditPostButton',

  propTypes: {
    user: React.PropTypes.object.isRequired,
    post: React.PropTypes.object.isRequired
  },

  onEditPost: function() {
    // launch edit dialog...
  },

  render: function () {
    return (
      <button onClick={this.onEditPost}>
        Edit Post
      </button>
    );
  }
}));
```

The disadvantage to using this component is that it is not as semantically clear what this decorator is doing. Instead of being able to read something like `UserIsPostCreator` and thinking _"okay, so this component will be rendered if the user is the creator of the post"_ you (or other developers) will need to read the code to decipher the intent.

# Alternate Uses
Another use for authorization might be to show/hide a badge based on information about the relationship between two people. For example, maybe you want to display a badge on all posts that were created by your friends, or on all posts that have over 500 likes. You could also use the "Authorization" component to control that behavior, or create your own generator using `AuthGeneratorFactory` and referencing `AuthenticationGenerator` or `AuthorizationGenerator` as an example implementation.
