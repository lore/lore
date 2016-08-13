var React = require('react');
var mui = require('material-ui');
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
var withMuiTheme = require('../decorators/withMuiTheme').default;

module.exports = React.createClass({
  displayName: 'Todo',

  getStyles: function(isCompleted) {
    return {
      title: isCompleted ? {
        color: '#d9d9d9',
        textDecoration: 'line-through'
      } : {}
    }
  },

  onEdit: function() {
    var todo = this.props.todo;

    function updateTodo(params) {
      lore.actions.todo.update(todo, params);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.update({
        model: todo,
        onSubmit: updateTodo,
        contentClassName: 'compact-dialog'
      }, {
        muiTheme: withMuiTheme
      });
    });
  },

  onDestroy: function() {
    var todo = this.props.todo;

    function destroyTodo() {
      lore.actions.todo.destroy(todo);
    }

    lore.dialog.show(function() {
      return lore.dialogs.todo.destroy({
        model: todo,
        onSubmit: destroyTodo,
        contentClassName: 'compact-dialog'
      }, {
        muiTheme: withMuiTheme
      });
    });
  },

  renderRightIconMenu: function() {
    var iconButtonElement = (
      <mui.IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </mui.IconButton>
    );

    return (
      <mui.IconMenu desktop={true} iconButtonElement={iconButtonElement}>
        <mui.MenuItem onTouchTap={this.onEdit}>
          Edit
        </mui.MenuItem>
        <mui.MenuItem onTouchTap={this.onDestroy}>
          Delete
        </mui.MenuItem>
      </mui.IconMenu>
    );
  },

  render: function() {
    var todo = this.props.todo;
    var styles = this.getStyles(todo.data.isCompleted);

    var leftIcon = (
      <mui.Badge
        badgeContent={todo.data.priority}
        primary={true} >
      </mui.Badge>
    );

    var rightIconMenu = this.renderRightIconMenu();

    return (
      <mui.ListItem
        key={todo.id || todo.cid}
        primaryText={
          <div style={styles.title}>
            {todo.data.title}
          </div>
        }
        secondaryText={todo.data.description}
        secondaryTextLines={2}
        leftIcon={leftIcon}
        rightIconButton={rightIconMenu}
      />
    );
  }

});
