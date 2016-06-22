/**
 * Configuration file for the reducer-action map
 *
 * This file is where you define overrides for the default action-reducer map.
 * Whenever you create a model in Lore, the conventions will automatically
 * create a set of reducers and actions to support basic CRUD operations and
 * lazy-loading of data from the server.  For example, if you create a model
 * called `todo`, the default map is as follows:
 *
 *  Action         | ActionType  | Reducer
 *  :------------- | :---------- | :------
 *  todo.fetchAll  | FETCH_TODOS | todo.all
 *  todo.fetch     | FETCH_TODO  | todo.byId
 *
 * To better understand the map, it helps to take a look at the typical usage
 * for `lore.connect`).  Here we want to retrieve all the todos that have been
 * created.
 *
 * lore.connect(function(getState, props) {
 *   return {
 *     todos: getState('todo.all', { where: {}})
 *   }
 * })
 *
 * What happens when `getState()` is called, is that it looks at the `todo.all`
 * string, which represents the reducer that you want the data for.  Lore then
 * looks at the state of that reducer at the time of the function call.  If the
 * state for that reducer hasn't been initialized yet (no data has been fetched
 * from the server) it will execute the action on the other side of the map.
 * 
 * So the first time you call `getState('todo.all')` the reducer won't any data
 * in it.  So Lore will then call `actions.todo.fetchAll` to retrieve the list of
 * todos.  Once the data comes back from the server (passing through whatever
 * parse methods you've specified to transform the data), the action will package
 * up the data and emit an action with an ActionType of `FETCH_TODOS`. This
 * ActionType is something the `todo.all` reducer is configured to look for,
 * and will then store the data, and the app will be notified that there is
 * new data in the store.  The app will update, and your component will call
 * `getState('todo.all')` again.  But this time Lore will see there *is* data
 * in the reducer state, and so it will return it *without* calling the action
 * this time.
 * 
 * ### Problems This Map Helps Address
 * 
 * 1. **Duplicate AJAX Calls** - if components declare the data they want, and an
 * AJAX call is executed to fetch that data if it doesn't exist, then everytime
 * the component renders there's the potential to make an AJAX request.  If
 * guards aren't in place to know when an AJAX request is or isn't in flight,
 * you can end up making multiple AJAX requests for the same data. Depending on
 * the number of request and the rate that components update, this has the
 * potential to severely degrade the usability of your application and apply
 * unnecessary load to your API server.
 * 
 * 2. **Infinite Loop + Browser Crash** - A big motivation for establishing
 * conventions around reducers and actions was due to how easy it can be to
 * accidentally end up in an infinite loop in React/Redux in a lazy-loading
 * setup like `lore.connect` is configured for (a setup where components declare
 * the data they want and something else is responsible for fetching if it
 * doesn't exist).  If a component requests state, like `todo.all`, and that
 * state doesn't exist, an action will be triggered and the store will be updated
 * to reflect the fact that data is being fetching, and the component will get
 * updated because the reducer state changed.  Which will give it another
 * opportunity to request `todo.all`.  At this point, there are 3 pieces that
 * need to have been linked up properly in order to form a proper guard to prevent
 * duplicate AJAX calls.  First, there needs to be a reducer called `todo.all`,
 * then there needs to be an action called `todo.fetchAll`, and finally there
 * needs to be an ActionType called `FETCH_TODOS` the the action emits and the
 * reducer waits.  Without conventions, there's a lot of files that need to be
 * copy/pasted to enable that data flow for every model/endpoint you need in
 * your application.  If you accidentally `require()` the wrong file, or forget
 * to make all the neccesary changes in your copy/pasted files, or forget to
 * create the ActionType, or forget to make sure the correct ActionType is being
 * emitted and listened for, the component may end up accessing the store again,
 * finding no data, making a request, and updating the store, and getting called
 * again, and accessing the store again, and finding no data, and making a
 * request, and so on.  It's a conceptually simple bug to solve if you know what
 * to look for, but can be incredibly time consuming to track down the first
 * time you see if it you don't want to look for, and you have to manually
 * force quit the browser tab when it happens.  This "little" problem can be
 * draining, a huge blocker, and incredibly frustrating for other people working
 * in your project. So a big reason for creating conventions around reducer and
 * actions and setting up a map between them was to solve this problem.  This
 * way the framework has the ability to guard against and limit certain
 * situations (at least until you override the conventions).
 **/

export default {

  /****************************************************************************
  *                                                                           *
  * Add custom action-reducer maps here, or override existing ones            *
  *                                                                           *
  ****************************************************************************/

  // 'todo.all': {
  //   action: 'todo.fetchAll'
  // },
  //
  // 'todo.byId': {
  //   action: 'todo.fetch'
  // }

}
