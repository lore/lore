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
