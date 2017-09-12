var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var AutoCompleteField = require('lore-react-forms-bootstrap').AutoCompleteField;
var tweets = require('../_common/tweets.json');
var FormState = require('../_common/FormState').default;

/**
 * Basic configuration outside a form
 */
module.exports = React.createClass({
  displayName: 'ExampleSimpleTweet',

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

  /*
   * Used to filter data
   */
  updateOptions: function(searchText) {
    var options = {
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
          onChange={this.onChange}
          updateOptions={this.updateOptions}
        />
      </div>
    );
  }

});
