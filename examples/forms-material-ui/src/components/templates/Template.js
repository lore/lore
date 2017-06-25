var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

// react-form
var Form = require('lore-react-forms/Form');
var FormSection = require('lore-react-forms/FormSection');
var PropBarrier = require('lore-react-forms/PropBarrier');

var Template = require('lore-react-forms/Template');

class CustomTemplate extends Template {

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

  renderFields(dialog, form) {
    return (
      <FormSection className="mui-card-text">
        {this.getFields(dialog, form)}
      </FormSection>
    );
  }

  renderActions(dialog, form) {
    var actions = this.getActions(dialog, form);

    if (actions.length === 0) {
      return null;
    }

    return (
      <PropBarrier className="mui-card-actions">
        {actions}
      </PropBarrier>
    );
  }

}

module.exports = CustomTemplate;
