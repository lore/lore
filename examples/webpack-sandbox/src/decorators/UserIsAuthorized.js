/**
 * This file provides a higher order component that you can use to hide parts
 * of the application you don't want the user to see, such as buttons for actions
 * they don't have permission to perform.
 *
 * When this component is "rendered", the 'isAuthorized' method will be invoked.
 * If the method returns true, whatever component this wraps will be rendered as it
 * normally would. But if 'isAuthorized' returns false, this decorator will prevent
 * the component it wraps from being rendered.
 *
 * The recommended usage for this component is to duplicate this file and rename
 * it to something specific, like "UserCanDeletePost". Then you would update the
 * 'isAuthorized' method with whatever rule determines if a user can delete a post,
 * and then wrap the "delete" button in a Post component with this decorator. Doing
 * that will hide the delete button from any user who doesn't have permission to
 * delete the Post.
 *
 * See this URL for more information:
 * https://github.com/lore/lore/tree/master/packages/lore-auth
 */

var React = require('react');
var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;

module.exports = AuthorizationGenerator({
  wrapperDisplayName: 'UserIsAuthorized',

  isAuthorized: function(storeState) {
    return true;
  }
});
