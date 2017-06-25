var validator = require('validator');
var PayloadStates = require('../constants/PayloadStates');

var isRequired = function(value) {
  if (value === null || value === undefined || validator.isEmpty(value)) {
    return 'This field is required'
  }
};

var isRequiredAndNumber = function(value) {
  if (value === null || value === undefined || !validator.isNumeric(String(value))) {
    return 'This field is required'
  }
};

var isRequiredAndBoolean = function(value) {
  if (value === true || value === false) {
    return;
  }

  return 'This field is required';
};

var isEmail = function(value) {
  if (!validator.isEmail(value)) {
    return 'Must be an email address'
  }
};

var isPasswordMatch = function(password, value) {
  if (value !== password) {
    return 'Passwords must match'
  }
};

var isResolved = function(model, value) {
  if (!model) return;

  if (model.state !== PayloadStates.RESOLVED) {
    return 'Checking availability...'
  }
};

var isUrl = function(value) {
  if (value === null || value === undefined || value === '') {
    return;
  }

  if (!validator.isURL(value)) {
    return 'Must be a url'
  }
};

module.exports = {
  isRequired: isRequired,
  isEmail: isEmail,
  isPasswordMatch: isPasswordMatch,
  isUrl: isUrl,
  number: {
    isRequired: isRequiredAndNumber,
  },
  boolean: {
    isRequired: isRequiredAndBoolean,
  },
  model: {
    isResolved: isResolved
  }
};
