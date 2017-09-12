var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var AutoCompleteField = require('lore-react-forms-bootstrap').AutoCompleteField;
var tweets = require('../_common/tweets.json');
var PayloadStates = require('../../constants/PayloadStates');
var FormState = require('../_common/FormState').default;

/**
 * Filter data via the `filter` function
 */
module.exports = React.createClass({
  displayName: 'ExampleFilterTweet',

  getInitialState: function() {
    return {
      userId: null
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  filter: function(searchText) {
    var options = {
      state: PayloadStates.RESOLVED,
      data: tweets.data.filter(function(tweet) {
        return tweet.data.text.indexOf(searchText) >= 0;
      })
    };

    return options;
  },

  render: function() {
    var data = this.state;
    var options = tweets;
    var errors = {};

    return (
      <div>
        <FormState data={this.state} />
        <AutoCompleteField
          data={data}
          errors={errors}
          label="Tweet"
          name="tweetId"
          field="text"
          options={options}
          filter={this.filter}
          onChange={this.onChange}
        />
      </div>
    );
  }

});
