var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var CreateCardHook = require('./CreateCard.hook');
var UpdateCardHook = require('./UpdateCard.hook');
var List = require('./List');
var Connect = require('../Connect');
var Spinner = require('../Spinner');

module.exports = React.createClass({
  displayName: 'Layout',

  getUser: function(getState, props) {
    var userId = this.props.params.userId;

    return {
      user: getState('user.byId', {
        id: userId
      })
    }
  },

  shouldDisplaySpinner: function() {
    var userId = this.props.params.userId;
    var user = lore.getState('user.byId', {
      id: userId
    });
    return (
      user.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    var userId = this.props.params.userId;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {userId ? "Update" : "Create"}
          </h2>
          <br/>
          {userId ? (
            <Connect callback={this.getUser}>
              <Spinner display={this.shouldDisplaySpinner}>
                <UpdateCardHook key={userId} />
              </Spinner>
            </Connect>
          ) : <CreateCardHook />}
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});
