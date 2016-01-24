"use strict";

var React = require('react');
var mui = require('material-ui');
var DeleteIcon = require('material-ui/lib/svg-icons/action/delete');
var EditIcon = require('material-ui/lib/svg-icons/image/edit');
let Colors = require('material-ui/lib/styles/colors');
var PayloadStates = require('../../constants/PayloadStates');
var UpdateTodoDialog = require('../../dialogs/todo/Update');
var DeleteTodoDialog = require('../../dialogs/todo/Delete');

module.exports = React.createClass({
  displayName: 'TodoListItem',

  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  getStyles: function(){
    return {
      container: {
        position: 'absolute',
        right: '0px',
        marginTop: '-16px'
      },
      iconStyle: {
        fill: Colors.lightBlack
      }
    }
  },

  onEditTodo: function(){
    var todo = this.props.todo;

    function updateTodo(params) {
      lore.actions.todo.update(todo, params);
    }

    lore.dialog.show(function(){
      return (
        <UpdateTodoDialog
          todo={todo}
          onSubmit={updateTodo} />
      );
    });
  },

  onDeleteTodo: function(){
    var todo = this.props.todo;

    function deleteTodo() {
      lore.actions.todo.destroy(todo);
    }

    lore.dialog.show(function(){
      return (
        <DeleteTodoDialog
          onSubmit={deleteTodo}/>
      );
    });
  },

  onChecked: function() {
    var todo = this.props.todo;

    lore.actions.todo.update(todo, {
      isCompleted: !todo.data.isCompleted
    });
  },

  renderIcons: function() {
    var styles = this.getStyles();

    return (
      <div style={styles.container}>
        <mui.IconButton
          iconStyle={styles.iconStyle}
          onClick={this.onEditTodo} >
          <EditIcon/>
        </mui.IconButton>
        <mui.IconButton
          iconStyle={styles.iconStyle}
          onClick={this.onDeleteTodo} >
          <DeleteIcon/>
        </mui.IconButton>
      </div>
    )
  },

  render: function() {
    var styles = this.getStyles();
    var todo = this.props.todo;

    var checkbox = (
      <mui.Checkbox
        checked={todo.data.isCompleted}
        onCheck={this.onChecked} />
    );

    return (
      <mui.ListItem
        leftCheckbox={checkbox}
        primaryText={todo.data.title}>
        {this.renderIcons()}
      </mui.ListItem>
    )
  }

});
