var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
import FlatButton from 'material-ui/FlatButton';
var DialogMixin = require('../mixins/DialogMixin');

module.exports = function(options) {
  options = options || {};

  var title = options.title;
  var submitButtonText = options.submitButtonText;

  return options.muiTheme(React.createClass({
    displayName: 'Dialog',

    mixins: [DialogMixin],

    propTypes: {
      model: React.PropTypes.object.isRequired,
      contentClassName: React.PropTypes.string
    },

    render: function () {
      var dialogActions = [
        <FlatButton
          label="Cancel"
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
          <p>
            Are you sure you want to destroy this model?
          </p>
        </mui.Dialog>
      );
    }
  }));
};
