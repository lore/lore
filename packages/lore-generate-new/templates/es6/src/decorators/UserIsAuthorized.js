/**
 * This file provides a higher order component that you can use to block the
 * rendering of a component that user does not have permission to interact with.
 *
 * When this component is rendered, the 'isAuthenticated()' method will be invoked.
 *
 * If it returns 'true', the component this wraps will be rendered, and the application
 * will appear as if this decorator doesn't exist.
 *
 * If it returns 'false', nothing will be rendered, and the application will appear
 * as if that component doesn't exist.
 *
 * See this link for more information:
 *
 * https://www.lorejs.org/anatomy/src/decorators/user-is-authorized/
 */

import { AuthorizationGenerator } from 'lore-auth';

export default AuthorizationGenerator({
  displayName: 'UserIsAuthorized',

  isAuthorized() {
    return true;
  }
})
