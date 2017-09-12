var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var validators = require('../../utils/validators');
var DynamicTextField = require('lore-react-forms-bootstrap').DynamicTextField;
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
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  connect: function(getState, props) {
    var username = props.data['username'];

    if (!username) {
      return {
        _model: null
      }
    }

    return {
      _model: getState('username.byId', {
        id: username
      })
    }
  },

  getMessage: function(model) {
    var options = {
      icon: null,
      message: ''
    };

    if (!model) {
      return options;
    } else if (model.state === PayloadStates.FETCHING) {
      options.icon = (
        <span className="glyphicon glyphicon-repeat" style={{
          position: 'absolute',
          top: '35px',
          right: '8px'
        }} />
      );
    } else if (model.state === PayloadStates.NOT_FOUND) {
      options.icon = (
        <span className="glyphicon glyphicon-ok" style={{
          position: 'absolute',
          top: '35px',
          right: '8px',
          color: 'green'
        }} />
      );
    } else if (model.state === PayloadStates.RESOLVED) {
      options.icon = (
        <span className="glyphicon glyphicon-exclamation-sign" style={{
          position: 'absolute',
          top: '35px',
          right: '8px',
          color: 'red'
        }} />
      );
      options.message = model.error.username || 'Username already taken';
    }

    return options;
  },

  render: function() {
    var data = this.state;
    var options = users;
    var errors = {};

    return (
      <div>
        <FormState data={this.state} />
        <DynamicTextField
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
