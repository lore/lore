/* eslint consistent-return: "off" */

import React from 'react';
import _ from 'lodash';

export default React.createClass({
  displayName: 'Form',

  propTypes: {
    data: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object,
    validators: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      errors: {}
    };
  },

  getInitialState: function() {
    return {
      // isSaving: false,
      isModified: false
    };
  },

  onChange: function(name, value) {
    if (!this.state.isModified) {
      this.setState({
        isModified: true
      });
    }

    this.props.onChange(name, value);
  },

  // getValidators: function(data) {
  //   if (this.props.validators) {
  //     return this.props.validators;
  //   }
  //
  //   if (this.props.getValidators) {
  //     return this.props.getValidators(data);
  //   }
  //
  //   return {};
  // },

  getErrors: function(validatorDictionary, data) {
    if (this.props.getErrors) {
      return this.props.getErrors(validatorDictionary, data);
    }

    return _.mapValues(data, function(value, key) {
      const validators = validatorDictionary[key];
      let error = null;
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

    const errorCount = _.reduce(errors, function(result, value, key) {
      if (value) {
        return result + 1;
      }

      return result;
    }, 0);
    return errorCount > 0;
  },

  createFields: function(errors, hasError, options) {
    let children = this.props.children;

    if (_.isFunction(children)) {
      children = children(options);
    }

    const handlers = {
      onChange: this.onChange
    };

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const props = {
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
    const data = this.props.data;
    const validators = this.props.validators || {}; // this.getValidators(data);
    const errors = this.getErrors(validators, data);
    const hasError = this.hasError(errors);
    const parentErrors = this.props.errors;
    const allErrors = _.assign({}, errors, parentErrors);

    return (
      <div>
        {this.createFields(allErrors, hasError, {
          data: data,
          validators: validators,
          errors: errors,
          hasError: hasError,
          parentErrors: parentErrors,
          allErrors: allErrors,
          // isSaving: this.state.isSaving,
          isModified: this.state.isModified
        })}
      </div>
    );
  }

});
