import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useUser } from '@lore/auth';

export default function Filter(props) {
  const user = useUser();

  return (
    <div className="filter">
      <ul className="list-group">
        <NavLink className="list-group-item" activeClassName="active" to="/" exact={true}>
          Feed
        </NavLink>
        <NavLink className="list-group-item" activeClassName="active" to={`/users/${user.id}`}>
          My Tweets
        </NavLink>
      </ul>
    </div>
  );
}
