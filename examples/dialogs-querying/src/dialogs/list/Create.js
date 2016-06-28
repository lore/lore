"use strict";

var React = require('react');
var mui = require('material-ui');
var DialogMixin = require('../../mixins/DialogMixin');
var withMuiTheme = require('../../decorators/withMuiTheme').default;
import FlatButton from 'material-ui/FlatButton';

module.exports = withMuiTheme(React.createClass({
  displayName: 'CreateTodoDialog',

  mixins: [DialogMixin],

  getInitialState: function(){
    return {
      title: ""
    }
  },

  focus: function(){
    setTimeout(function() {
      if (this.isMounted()) {
        this.refs.textfield.focus();
      }
    }.bind(this), 300);
  },

  onSubmit: function(e){
    this.props.onSubmit({
      title: this.state.title
    });
    this.dismiss();
  },

  onCancel: function(e){
    this.dismiss();
  },

  onKeyDown: function(e){
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  },

  onChangeTitle: function(e){
    var title = e.target.value.trim();
    this.setState({
      title: title
    });
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

    var error = this.state.title ? null : "Required";

    return (
      <mui.Dialog
        ref="dialog"
        title="Create Todo List"
        open={this.state.isOpen}
        actions={dialogActions}
        contentClassName="compact-dialog" >
        <p>What is this list for?</p>

        <mui.TextField
          ref='textfield'
          errorText={"This field is required"}
          floatingLabelText="List Title"
          onChange={this.onChangeTitle}
          onKeyDown={this.onKeyDown} />

      </mui.Dialog>
    );
  }

}));
