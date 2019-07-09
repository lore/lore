import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useUser } from '@lore/auth';

export default function Profile(props) {
  const user = useUser();

  return (
    <div className="card profile">
      <div className="card-block">
        <img
          className="img-circle avatar"
          src={user.data.avatar} />
        <h4 className="card-title">
          Hi {user.data.nickname}!
        </h4>
        <div className="card-text">
          <p>You have permission to perform the following:</p>
          <ul className="permissions">
            <li>Create Tweets</li>
            <li>Edit your own tweets</li>
            <li>Delete your own tweets</li>
          </ul>
        </div>
        <Link className="btn btn-primary" to="/logout">
          Log out
        </Link>
      </div>
    </div>
  );
}
