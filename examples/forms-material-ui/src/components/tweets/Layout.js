var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var CreateCardForm = require('./CreateCard.form');
var CreateCardTemplate = require('./CreateCard.template');
var CreateCardHook = require('./CreateCard.hook');
var CustomCreateCardHook = require('./CreateCard.hook.custom');

var UpdateCardForm = require('./UpdateCard.form');
var UpdateCardTemplate = require('./UpdateCard.template');
var CustomUpdateCardTemplate = require('./UpdateCard.template.custom');
var UpdateCardHook = require('./UpdateCard.hook');
var CustomUpdateCardHook = require('./UpdateCard.hook.custom');
var List = require('./List');
var Connect = require('../Connect');
var Spinner = require('../Spinner');

module.exports = React.createClass({
  displayName: 'Layout',

  getTweet: function(getState, props) {
    var tweetId = this.props.params.tweetId;

    return {
      tweet: getState('tweet.byId', {
        id: tweetId
      }),
      users: getState('user.find')
    }
  },

  shouldDisplaySpinner: function(tweetId) {
    var tweetId = this.props.params.tweetId;
    var tweet = lore.getState('tweet.byId', {
      id: tweetId
    });
    var users = lore.getState('user.find');
    return (
      tweet.state === PayloadStates.FETCHING ||
      users.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    var tweetId = this.props.params.tweetId;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {tweetId ? "Update" : "Create"}
          </h2>
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardForm key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardForm /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardTemplate key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardTemplate /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <CustomUpdateCardTemplate key={tweetId} />
              </Spinner>
            </Connect>
          ) : null }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardHook key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CreateCardHook /> }
          <br/>
          {tweetId ? (
            <Connect callback={this.getTweet}>
              <Spinner display={this.shouldDisplaySpinner}>
                <CustomUpdateCardHook key={tweetId} />
              </Spinner>
            </Connect>
          ) : <CustomCreateCardHook /> }
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});
