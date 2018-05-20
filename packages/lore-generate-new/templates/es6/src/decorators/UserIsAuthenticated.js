/**
 * This file provides a higher order component that you can use to block access
 * to the application (or some part of it) if the user is not logged in.
 *
 * When this component is mounted, the 'isAuthenticated()' method will be invoked.
 *
 * If it returns 'true', the component this wraps will be rendered, and the application
 * will appear as if this decorator doesn't exist.
 *
 * If it returns 'false', this component renders nothing, and the 'redirect()' method
 * will be invoked to redirect the user somewhere else. The default location is /login.
 *
 * See this link for more information:
 *
 * https://www.lorejs.org/anatomy/src/decorators/user-is-authenticated/
 */

import PropTypes from 'prop-types';
import { AuthenticationGenerator } from 'lore-auth';

export default AuthenticationGenerator({

  propTypes: {
    router: PropTypes.object.isRequired
  },

  redirect() {
    const { router } = this.props;
    router.push('/login');
  },

  isAuthenticated() {
    return true;
  }

});
