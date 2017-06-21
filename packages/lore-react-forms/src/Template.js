var React = require('react');
var _ = require('lodash');

// react-form
var Form = require('./Form');
var FormSection = require('./FormSection');
var PropBarrier = require('./PropBarrier');

class Template extends React.Component {

  constructor(props) {
    super(props);

    [
      'onChange',
      'getValidators',
      // 'onSubmit',
      'renderField',
      'renderFields',
      'getFields',
      'renderAction',
      'renderActions',
      'getActions',
      'render'
    ].forEach(function(methodName) {
      if (props[methodName]) {
        this[methodName] = props[methodName].bind(this);
      }
    }.bind(this));

    this.state = _.mapValues(props.fields, function(value, key) {
      return value.data;
    });
  }

  getValidators(data) {
    return _.mapValues(this.props.fields, function(value, key) {
      return _.isFunction(value.validators) ? value.validators(data) : value.validators;
    });
  }

  onChange(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  renderField(name, field) {
    var Field = lore.config.forms.typeFieldMap[field.type];

    return (
      <FormSection key={name} className="row">
        <FormSection className="col-md-12">
          {Field ? Field(name, field.options) : null}
        </FormSection>
      </FormSection>
    );
  }

  getFields(dialog, form) {
    var fields = [];
    _.mapValues(this.props.fields, function(value, key) {
      fields.push(this.renderField(key, value));
    }.bind(this));
    return fields;
  }

  renderFields(dialog, form) {
    return (
      <FormSection>
        {this.getFields(dialog, form)}
      </FormSection>
    );
  }

  renderAction(name, action) {
    var Action = lore.config.forms.typeActionMap[action.type];
    return Action ? Action(name, action.options, this.onSubmit) : null;
  }

  getActions(dialog, form) {
    var actions = [];
    _.mapValues(this.props.actions, function(value, key) {
      actions.push(this.renderAction(key, value));
    }.bind(this));
    return actions;
  }

  renderActions(dialog, form) {
    var actions = this.getActions(dialog, form);

    if (actions.length === 0) {
      return null;
    }

    return (
      <PropBarrier>
        {actions}
      </PropBarrier>
    );
  }

  render() {
    var data = this.state;
    var validators = this.getValidators(data);
    var dialog = null;

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            {this.renderFields(dialog, form)}
            {this.renderActions(dialog, form)}
          </FormSection>
        )}
      </Form>
    );
  }

}

Template.propTypes = {
  onSubmit: React.PropTypes.func
};

Template.defaultProps = {
  fields: {},
  actions: {}
};

module.exports = Template;
