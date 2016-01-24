"use strict";

var React = require('react');
var mui = require('material-ui');
var MuiThemeMixin = require('../../mixins/MuiThemeMixin');
var DialogMixin = require('../../mixins/DialogMixin');

module.exports = React.createClass({
  displayName: 'DeleteTodoDialog',

  mixins: [MuiThemeMixin, DialogMixin],

  onSubmit: function(e) {
    this.props.onSubmit();
    this.dismiss();
  },

  onCancel: function(e) {
    this.dismiss();
  },

  render: function () {
    var dialogActions = [
      { text: 'CANCEL', onClick: this.onCancel  },
      { text: 'DELETE', onClick: this.onSubmit }
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

});
