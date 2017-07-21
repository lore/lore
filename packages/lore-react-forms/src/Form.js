var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'Form',

  propTypes: {
    data: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object,
    validators: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      errors: {},
      isSaving: false
    }
  },

  getInitialState: function() {
    return {
      isSaving: this.props.isSaving,
      isModified: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var nextIsSaving = nextProps.isSaving;
    var isSaving = this.state.isSaving;

    if (nextIsSaving !== isSaving) {
      this.setState({
        isSaving: nextIsSaving
      });
    }

    if (isSaving === true && nextIsSaving === false) {
      this.setState({
        isModified: false
      });
    }
  },

  onChange: function(name, value) {
    if (!this.state.isModified) {
      this.setState({
        isModified: true
      });
    }

    this.props.onChange(name, value);
  },

  getErrors: function(validatorDictionary, data) {
    if (this.props.getErrors) {
     return this.props.getErrors(validatorDictionary, data);
    }

    return _.mapValues(data, function(value, key) {
      var validators = validatorDictionary[key];
      var error = null;
      if (validators) {
        validators.forEach(function(validator) {
          error = error || validator(value);
        });
      }
      return error;
    });
  },

  hasError: function(errors) {
    if (this.props.hasError) {
      return this.props.hasError(errors);
    }

    var errorCount = _.reduce(errors, function(result, value, key) {
      if (value) {
        return result + 1;
      }

      return result;
    }, 0);
    return errorCount > 0;
  },

  createFields: function(errors, hasError, options) {
    var children = this.props.children;

    if (_.isFunction(children)) {
      children = children(options);
    }

    var handlers = {
      onChange: this.onChange
    };

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        var props = {
          data: this.props.data,
          errors: errors,
          hasError: hasError
          // validators: this.props.validators
        };

        return React.cloneElement(child, _.assign(props, handlers));
      }
    });
  },

  render: function() {
    var data = this.props.data;
    var validators = this.props.validators || {};
    var errors = this.getErrors(validators, data);
    var hasError = this.hasError(errors);
    var parentErrors = this.props.errors;
    var allErrors = _.assign({}, errors, parentErrors);

    return (
      <div>
        {this.createFields(allErrors, hasError, {
          data: data,
          validators: validators,
          errors: errors,
          hasError: hasError,
          parentErrors: parentErrors,
          allErrors: allErrors,
          isModified: this.state.isModified,
          isSaving: this.state.isSaving
        })}
      </div>
    );
  }

});