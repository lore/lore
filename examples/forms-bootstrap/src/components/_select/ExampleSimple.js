var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var SelectField = require('lore-react-forms-bootstrap').SelectField;
var users = require('../_common/users.json');
var FormState = require('../_common/FormState').default;

/**
 * Basic configuration outside a form
 */
module.exports = React.createClass({
  displayName: 'ExampleSimple',

  getInitialState: function() {
    return {
      userId: null
    }
  },

  onChange: function(name, value) {
    console.log('onChange')
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
        <SelectField
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
