/**
 * Configuration file for Auth0
 */

export default {
  clientID: process.env.AUTH0_CLIENT_ID || '7h08UCcZvca52h47zhsuohoqDHduAvZW',
  domain: process.env.AUTH0_DOMAIN || 'lorejs.auth0.com',
  redirectUri: 'http://localhost:3000/auth/callback',
  audience: 'https://lorejs.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
}
