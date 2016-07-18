/**
 * This component serves as the root of your application.  Typically, it should be the only
 * component subscribed to the store.
 **/

import React from 'react';

@lore.connect(function(getState, props) {
  return {};
}, { subscribe: true })
class Master extends React.Component {

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children)}
      </div>
    );
  }

}

export default Master;

/**
 * If your application has authentication, this is a good place to fetch the
 * current user.  Assuming you've created an action that knows how to fetch
 * the user, and a reducer to store the user, and defined the map between them
 * in `config/reducerActionMap`, you would do something like this:
 *
 *  import React from 'react';
 *  import PayloadStates from '../constants/PayloadStates';
 *
 *  @lore.connect(function(getState, props){
 *    return {
 *      user: getState('user.current')
 *    }
 *  }, { subscribe: true })
 *  class Master extends React.Component {
 *
 *    static propTypes = {
 *      children: React.PropTypes.any,
 *      user: React.PropTypes.object.isRequired
 *    };
 *
 *    render() {
 *      const user = this.props.user;
 *
 *      // show some kind of loading screen until we know who the user is
 *      if (user.state === PayloadStates.FETCHING) {
 *        return (
 *          <h1>Loading...</h1>
 *        );
 *      }
 *
 *      return (
 *        <div>{this.props.children}</div>
 *      );
 *    }
 *  }
 *
 *  export default Master;
 *
 **/


