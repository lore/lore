import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

Profile.defaultProps = {
  user: {
    id: 1,
    data: {
      nickname: 'ayla',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png'
    }
  }
};

export default function Profile(props) {
  const { user } = props;

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
