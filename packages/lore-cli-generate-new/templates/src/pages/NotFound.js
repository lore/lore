import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import RemoveLoadingScreen from '../components/RemoveLoadingScreen';

export default function NotFound(props) {
  const { location } = props;

  return (
    <>
      <RemoveLoadingScreen/>
      <div className="header">
        <div className="container">
          <div className="title">
            <img className="logo" alt="logo" src={logo} />
            <h1>
              404 NOT FOUND
            </h1>
            <h3>
              There is no page registered for the route <code>{location.pathname}</code>
            </h3>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <ul>
            <li>
              <div>
                <h3>Want to change how this page looks?</h3>
                <p>Edit the file at <code>src/pages/NotFound.js</code></p>
              </div>
            </li>
            <li>
              <Link to="/">Go to homepage</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
