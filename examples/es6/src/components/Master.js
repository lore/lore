/**
 * This component serves as the root of your application, and should typically be the only
 * component subscribed to the store.
 *
 * It is also a good place to fetch the current user. Once you have configured 'models/currentUser'
 * to fetch the current user (by pointing it to the correct API endpoint) uncomment the commented
 * out code below in order to fetch the user, display a loading experience while they're being
 * fetched, and store the user in the applications context so that components can retrieve it
 * without having to pass it down through props or extract it from the Redux store directly.
 **/

import React, { Component, PropTypes } from 'react';
import PayloadStates from '../constants/PayloadStates';
import '../../assets/css/main.css';

class Master extends Component {

  // getChildContext() {
  //   return {
  //     user: this.props.user
  //   };
  // }

  componentDidMount() {
    // If you want to play with the router through the browser's dev console then
    // uncomment out this line. React Router automatically provides 'router'
    // to any components that are "routes" (such as Master and Layout), so this
    // is a good location to attach it to the global lore object.

    // lore.router = this.props.router;
  }

  render() {
    // const user = this.props.user;

    // if (user.state === PayloadStates.FETCHING) {
    //   return (
    //     <h1 className="loading-text">
    //       Loading...
    //     </h1>
    //   )
    // }

    return (
      <div>
        {React.cloneElement(this.props.children)}
      </div>
    );
  }

}

// Master.propTypes = {
//   user: PropTypes.object.isRequired
// };

// Master.childContextTypes = {
//   user: PropTypes.object
// };

export default lore.connect(function(getState, props) {
  return {
    // user: getState('currentUser')
  };
}, { subscribe: true })(Master);
