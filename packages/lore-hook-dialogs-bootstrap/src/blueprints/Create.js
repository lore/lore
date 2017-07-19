import React from 'react';
import DialogMixin from '../mixins/DialogMixin';
import StringField from '../fields/StringField';
import TextField from '../fields/TextField';
import BooleanField from '../fields/BooleanField';
import NumberField from '../fields/NumberField';
import _ from 'lodash';

export default function(options) {
  options = options || {};

  var title = options.title;
  var cancelButtonText = options.cancelButtonText;
  var submitButtonText = options.submitButtonText;
  var attributes = options.attributes;
  var defaults = options.defaults;
  var attributeNames = _.keys(attributes);

  return React.createClass({
    displayName: 'Dialog',

    mixins: [DialogMixin],

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

      return (
        <div className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
                <h4 className="modal-title">
                  {title}
                </h4>
              </div>
              <div className="modal-body">
                <form>
                  {formFields}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  {cancelButtonText}
                </button>
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>
                  {submitButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};
