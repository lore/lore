import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import UserIsAuthenticated from '../decorators/UserIsAuthenticated';
import Master from '../pages/Master';
import Layout from '../pages/Layout';

export default ({ component: Component, render, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return (
        <UserIsAuthenticated>
          <Master {...props}>
            <Layout {...props}>
              {Component ? (
                <Component {...props} />
              ) : render ? render(props) : null}
            </Layout>
          </Master>
        </UserIsAuthenticated>
      );
    }} />)
  ;
};
