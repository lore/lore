import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import DialogMixin from '../mixins/DialogMixin';

export default function(options) {
  options = options || {};

  var title = options.title;
  var cancelButtonText = options.cancelButtonText;
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
          <p>
            Are you sure you want to delete this?
          </p>
        </Dialog>
      );
    }
  }));
};
