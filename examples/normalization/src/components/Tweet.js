import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import moment from 'moment';
import EditLink from './EditLink';
import DeleteLink from './DeleteLink';
import ViewLink from './ViewLink';

export default connect(function(getState, props){
  const tweet = props.tweet;

  return {
    user: getState('user.byId', {
      id: tweet.data.userId
    })
  };
})(
createReactClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  },

  render: function() {
    const { tweet, user } = this.props;
    const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

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
          <div>
            <EditLink tweet={tweet} />
            <DeleteLink tweet={tweet} />
            <ViewLink tweet={tweet} />
          </div>
        </div>
      </li>
    );
  }

})
);
