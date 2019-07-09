import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useConnect } from '@lore/connect';
import EditLink from './EditLink';
import DeleteLink from './DeleteLink';
import UserIsAuthorized from '../decorators/UserIsAuthorized';

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default function Tweet(props) {
  const { tweet } = props;
  const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

  const user = useConnect('user.byId', {
    id: tweet.data.user
  });

  return (
    <li className="list-group-item tweet">
      <div className="image-container">
        <img
          className="img-circle avatar"
          src={user.data.avatar} />
      </div>
      <div className="content-container">
        <h4 className="list-group-item-heading title">
          {user.data.nickname}
        </h4>
        <h4 className="list-group-item-heading timestamp">
          {'- ' + timestamp}
        </h4>
        <p className="list-group-item-text text">
          {tweet.data.text}
        </p>
        <UserIsAuthorized authorized={(user) => user.id === tweet.data.user}>
          <div className="tweet-actions">
            <EditLink tweet={tweet} />
            <DeleteLink tweet={tweet} />
          </div>
        </UserIsAuthorized>
      </div>
    </li>
  );
}
