/**
 * This component serves as the root of your application.  Typically, it should be the only
 * component subscribed to the store.
 **/

var React = require('react');

module.exports = lore.connect(function(getState, props) {
    return {};
  }, {subscribe: true})(
  React.createClass({
    displayName: 'Master',

    render: function() {
      return (
        <div>
          {React.cloneElement(this.props.children)}
        </div>
      );
    }
  })
);

/**
 * If your application has authentication, this is a good place to fetch the
 * current user.  Assuming you've created an action that knows how to fetch
 * the user, and a reducer to store the user, and defined the map between them
 * in `config/reducerActionMap`, you would do something like this:
 *
 * var React = require('react');
 * var PayloadStates = require('../constants/PayloadStates');
 *
 * module.exports = lore.connect({
 *     subscribe: true
 *   }, function(getState, props){
 *     return {
 *       user: getState('user.current')
 *     }
 *   },
 *   React.createClass({
 *     displayName: 'Master',
 *
 *     propTypes: {
 *       children: React.PropTypes.any,
 *       user: React.PropTypes.object.isRequired
 *     },
 *
 *     render: function() {
 *       var user = this.props.user;
 *
 *       // show some kind of loading screen until we know who the user is
 *       if(user.state === PayloadStates.FETCHING){
 *         return (
 *           <h1>Loading...</h1>
 *         );
 *       }
 *
 *       return (
 *         <div>{this.props.children}</div>
 *       );
 *     }
 *   })
 * );
 *
 **/
