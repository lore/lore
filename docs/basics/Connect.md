# Connect

> TODO: Need to add better documentation explaining `lore.connect` and how it's different from the connect decorator 
in [react-redux](https://github.com/reactjs/react-redux).

If you're familiar with [react-redux](https://github.com/reactjs/react-redux) it's worth noting that the `connect` 
decorator in Lore is **not** the same as the `connect` decorator in `react-redux`. Lore's version is intentionally
dumber. 

The `connect` decorator in `react-redux` has logic in it that will block the render cycle if the props for that
component haven't changed. It's intended to be an optimization step, to prevent unnecessary re-rendering, but has the 
side effect that it prevents lower level components from learning about changes to the data store unless they subscribe 
to it themselves.

While you can certainly do that, one of Lore's opinions is that you shouldn't unless you need to. When multiple
components are subscribed to the data store, the application no longer renders top-to-bottom. It stops being 
predictable and easy to reason about.  Instead it updates in pieces, in whatever order the components are notified by
Store.

Example to illustrate (need to expand and provide better detail):

* ConnectDecorator(User) => AppRoot
  * ConnectDecorator(Apples)
    * Component A
  * ConnectDecorator(Apples + Bananas)
    * Component B
    
In the example above, the AppRoot is subscribed to data store, but only needs the current user.  It renders two
decorated components below it, A and B.  A is decorated to declare that it needs the list of Apples, and B is decorated
to declare that it needs the list of Apples AND Bananas.

If Component B allows the user to CREATE an Apple, it will get kicked off to an action and dispatched to the reducers.
At that point, AppRoot will get notified. But becuase AppRoot only cares about the User, and that didn't change, it 
won't re-render. And because it doesn't re-render, Components A and B are never re-rendered, which means they won't
get the updated list of Apples from the Store.
 
The alternative approach (which `react-redux` takes) is to have each of the components subscribe the store, so even if
AppRoot doesn't re-render, Components A and B will still get a chance to.

For large applications, there are **a lot** of components that end up needing data, especially if the application has
a lot of routes. This ends up making the render cycle incredibly unpredictable, and is also quite painful to debug when
data isn't updating properly.
  
Lore's stance is that rendering performance is an optimization step, and something that you should tackle when (or if)
you need to. For many applications, data doesn't update frequently enough for it to be a problem. For others, such
as real-time apps that ALSO have a high frequency of data changes, it very well could be.  And in that case, it should
be tackled in a way that meets the performance requirements of the application.

If you are concerned about performance, Lore will be approaching this two ways:

1. By providing documentation and examples about how to use the `shouldComponentUpdate` method of Components to block 
the render cycle on a component-by-component basis

2. Eventually providing functionality similar to the Connect decorator in `react-redux`, where it "intelligently"
blocks the render cycle, but on an opt-in basis. 

While we recognize the importance of responsiveness in web applications, we believe (for the reasons stated above) that 
attempting to optimize rendering performance out of the gate only serves to make the application less predictable and
more opaque, in effect adding difficulty to the development experience without solving existing pain. We believe, in
this specific instance, that that pain should be addressed when it occurs, and the cost weighed against the 
predictability and simplicity of the natural rendering cycle for the application/React.
