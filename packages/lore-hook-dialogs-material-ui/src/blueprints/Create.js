import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import _ from 'lodash';
import DialogMixin from '../mixins/DialogMixin';
import StringField from '../fields/StringField';
import TextField from '../fields/TextField';
import BooleanField from '../fields/BooleanField';
import NumberField from '../fields/NumberField';

export default function(options) {
  options = options || {};

  var title = options.title;
  var description = options.description || '';
  var cancelButtonText = options.cancelButtonText;
  var submitButtonText = options.submitButtonText;
  var attributes = options.attributes;
  var defaults = options.defaults;
  var attributeNames = _.keys(attributes);

  return options.muiTheme(React.createClass({
    displayName: 'Dialog',

    mixins: [DialogMixin],

    propTypes: {
      contentClassName: React.PropTypes.string
    },

    getInitialState: function() {
      var that = this;

      // Create change callbacks
      this.onChangeCallbacks = _.reduce(attributeNames, function(callbacks, attributeName) {
        callbacks[attributeName] = function(event) {
          var newState = {};
          newState[attributeName] = event.target.value;
          that.setState(newState);
        };
        return callbacks;
      }, {});

      // Create initial state
      return _.reduce(attributeNames, function(initialState, attributeName) {
        initialState[attributeName] = defaults[attributeName] || attributes[attributeName].defaultValue;
        return initialState;
      }, {});
    },

    render: function () {
      var formFields = _.map(attributeNames, function(attributeName) {
        var attribute = attributes[attributeName];
        if (attribute.type === 'string') {
          return (
            <StringField
              key={attributeName}
              attribute={attribute}
              label={attributeName}
              value={this.state[attributeName]}
              onChange={this.onChangeCallbacks[attributeName]} />
          );
        } else if (attribute.type === 'text') {
          return (
            <TextField
              key={attributeName}
              attribute={attribute}
              label={attributeName}
              value={this.state[attributeName]}
              onChange={this.onChangeCallbacks[attributeName]} />
          );
        } else if (attribute.type === 'boolean') {
          return (
            <BooleanField
              key={attributeName}
              attribute={attribute}
              label={attributeName}
              value={this.state[attributeName]}
              onChange={this.onChangeCallbacks[attributeName]} />
          );
        } else if (attribute.type === 'number') {
          return (
            <NumberField
              key={attributeName}
              attribute={attribute}
              label={attributeName}
              value={this.state[attributeName]}
              onChange={this.onChangeCallbacks[attributeName]} />
          );
        }
      }.bind(this));

      var dialogActions = [
        <FlatButton
          label={cancelButtonText}
          primary={true}
          onTouchTap={this.onCancel}
        />,
        <FlatButton
          label={submitButtonText}
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.onSubmit}
        />
      ];

      return (
        <Dialog
          ref="dialog"
          title={title}
          open={this.state.isOpen}
          actions={dialogActions}
          contentClassName={this.props.contentClassName} >
          {description}
          {formFields}
        </Dialog>
      );
    }
  }));
};
