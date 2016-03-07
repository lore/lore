# Connecting the Component

Arguably the most difficult and complex part of creating a React/Redux application is managing the dataflow. While 
the flow itself is conceptually pretty simple, there's a lot of boilerplate code required to get started.  Every 
new resource you create needs a very similar set of *actions* and *reducers* to support CRUD actions; creating, 
retrieving, updating, and deleting data. 

**TODO** Talk about the boilerplate more in depth in a separate file.

Lore doesn't just reduce boilerplate; it *eliminates* it.  Lore makes basic assumptions about your API following 
certain patterns and best practices, and provided it does, then it's possible to create an entire application without
ever explicitly creating a single *action* or *reducer*.  Instead, the actions and reducers you create yourself in Lore
are only intended to *override* built in behaviors for the times when you have endpoints that don't conform to certain 
patterns or conventions.

But we'll get back to that later.  For now, let's connect our `Home` component to the data store so you can see what 
we mean.
  
Lore exposes a decorator called `lore.connect` that allows components to express which data they need. Once 
expressed, lore will retrieve that data and pass it to the component through it's props. To illustrate this, modify
the `Home` component by adding the `lore.connect` decorator and requesting all the colors.

```js
var React = require('react');
var Color = require('./Color');

module.exports = lore.connect(function(getState, props) {
    return {
      colors: getState('color.all', {
        where: { }
      })
    }
  },
  React.createClass({
    displayName: 'Home',

    propTypes: {
      colors: React.PropTypes.object.isRequired
    },

    renderColor: function(color) {
      return (
        <Color key={color} name={color} />
      );
    },

    render: function() {
      var colors = this.props.colors;

      return (
        <div>
          <h1>Colors</h1>
          <ul>
            {colors.data.map(this.renderColor)}
          </ul>
        </div>
      );
    }
  })
);
```

Once you do this, refresh the page and you should no longer see any colors.

**TODO** Explain error in console, no `https://api.example.com/colors`.

**TODO** Add faux-server initializer.
 
### What is going on?

At this point, it's not clear what's going on, but without writing any actions or reducers you managed to create a
complete dataflow for storing and interacting with Colors.  Next, we'll prove this by adding some code to our `Home`
component that allows us to create colors.

## Next Steps

Next we're going to [create some Colors](./CreateColors.md) to prove the application is storing data.
