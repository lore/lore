/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 */

import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';

export default function Layout(props) {
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="title">
            <img className="logo" alt="logo" src={logo} />
            <h1>
              Welcome to Lore!
            </h1>
            <h3>
              You're looking at <code>src/components/Layout.js</code>
            </h3>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <ul>
            <li>
              <div>
                <h3>Getting Started</h3>
                <p>Edit this file and the page will automatically reload to display changes.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>New to Lore?</h3>
                <p>Learn how to use it by following the <a target="_blank" href="http://www.lorejs.org/quickstart/">quickstart</a>.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
