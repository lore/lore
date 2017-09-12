var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var AutoCompleteField = require('lore-react-forms-bootstrap').AutoCompleteField;
var tweets = require('../_common/tweets.json');
var FormState = require('../_common/FormState').default;

/**
 * Filter data based on results from API endpoint
 */
module.exports = React.createClass({
  displayName: 'ExampleAjaxTweet',

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
  filter: function(searchText) {
    return lore.getState('tweet.find', {
      where: {
        text_like: searchText
      }
    });
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
          filter={this.filter}
        />
      </div>
    );
  }

});
