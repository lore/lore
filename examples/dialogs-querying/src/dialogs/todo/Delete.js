"use strict";

var React = require('react');
var mui = require('material-ui');
var DialogMixin = require('../../mixins/DialogMixin');
var withMuiTheme = require('../../decorators/withMuiTheme').default;
import FlatButton from 'material-ui/FlatButton';

module.exports = withMuiTheme(React.createClass({
  displayName: 'DeleteTodoDialog',

  mixins: [DialogMixin],

  onSubmit: function(e) {
    this.props.onSubmit();
    this.dismiss();
  },

  onCancel: function(e) {
    this.dismiss();
  },

  render: function () {
    var dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />
    ];

    return (
      <mui.Dialog
        ref="dialog"
        title="Delete Todo"
        open={this.state.isOpen}
        actions={dialogActions}
        contentClassName="compact-dialog" >
        <p>{"Are you sure you want to delete this Todo?"}</p>
      </mui.Dialog>
    );
  }

}));
