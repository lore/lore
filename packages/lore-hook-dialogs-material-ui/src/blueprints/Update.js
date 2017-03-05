var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
import FlatButton from 'material-ui/FlatButton';
var DialogMixin = require('../mixins/DialogMixin');
var StringField = require('../fields/StringField');
var TextField = require('../fields/TextField');
var BooleanField = require('../fields/BooleanField');
var NumberField = require('../fields/NumberField');

module.exports = function(options) {
  options = options || {};

  var title = options.title;
  var cancelButtonText = options.cancelButtonText;
  var submitButtonText = options.submitButtonText;
  var attributes = options.attributes;
  var defaults = options.defaults;
  var attributeNames = _.keys(attributes);

  return options.muiTheme(React.createClass({
    displayName: 'Dialog',

    mixins: [DialogMixin],

    propTypes: {
      model: React.PropTypes.object.isRequired,
      contentClassName: React.PropTypes.string
    },

    getInitialState: function() {
      var that = this;
      var model = this.props.model;

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
        initialState[attributeName] = model.data[attributeName];
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
        <mui.Dialog
          ref="dialog"
          title={title}
          open={this.state.isOpen}
          actions={dialogActions}
          contentClassName={this.props.contentClassName} >
          {formFields}
        </mui.Dialog>
      );
    }
  }));
};
