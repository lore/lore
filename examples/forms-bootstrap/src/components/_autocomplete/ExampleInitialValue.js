var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var AutoCompleteField = require('lore-react-forms-bootstrap').AutoCompleteField;
var users = require('../_common/users.json');
var FormState = require('../_common/FormState').default;

/**
 * Basic configuration outside a form
 */
module.exports = React.createClass({
  displayName: 'ExampleInitialValue',

  getInitialState: function() {
    return {
      userId: 1
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  render: function() {
    var data = this.state;
    var options = users;
    var errors = {};

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
