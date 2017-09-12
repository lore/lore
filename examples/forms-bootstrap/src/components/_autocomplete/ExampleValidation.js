var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var AutoCompleteField = require('lore-react-forms-bootstrap').AutoCompleteField;
var users = require('../_common/users.json');
var FormState = require('../_common/FormState').default;

/**
 * Will display an error if no value is set after field is touched
 */
module.exports = React.createClass({
  displayName: 'ExampleSimple',

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

  // getErrors: function(data) {
  //   var errors = {};
  //   if (!data.userId) {
  //     errors
  //   }
  //
  //   return errors;
  // },

  render: function() {
    var data = this.state;
    var options = users;
    var errors = {
      userId: data.userId ? null : 'This field is required'
    };

    return (
      <div>
        <FormState data={this.state} />
        <AutoCompleteField
          data={data}
          errors={errors}
          label="User"
          name="userId"
          field="username"
          options={options}
          onChange={this.onChange}
        />
      </div>
    );
  }

});
