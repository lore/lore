import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

Tweet.defaultProps = {};

export default function Tweet(props) {
  const { tweet } = props;
  const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

  return (
    <li className="list-group-item tweet">
      <div className="image-container">
        <img
          className="img-circle avatar"
          src={'http://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png'} />
      </div>
      <div className="content-container">
        <h4 className="list-group-item-heading title">
          Nickname
        </h4>
        <h4 className="list-group-item-heading timestamp">
          {'- ' + timestamp}
        </h4>
        <p className="list-group-item-text text">
          {tweet.data.text}
        </p>
      </div>
    </li>
  );
}
