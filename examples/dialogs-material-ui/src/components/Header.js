var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var SvgIcons = require('material-ui/svg-icons');
var AddIcon = require('material-ui/svg-icons/content/add').default;
var withMuiTheme = require('../decorators/withMuiTheme').default;

module.exports = Router.withRouter(React.createClass({
  displayName: 'Header',

  getStyles: function(){
    return {
      floatingActionButton: {
        top: '32px',
        right: '64px',
        position: 'fixed',
        zIndex: 5
      }
    }
  },

  onLeftIconButtonTouchTap: function() {
    this.props.router.push('/');
  },

  onFloatingActionButtonTouchTap: function(){
    function createTodo(params) {
      lore.actions.todo.create(params);
    }

    // lore.dialog.show(function() {
    //   return (
    //     <CreateListDialog onSubmit={createList} />
    //   );
    // });

    lore.dialog.show(function() {
      return lore.dialogs.todo.create({
        onSubmit: createTodo,
        contentClassName: 'compact-dialog'
      }, {
        muiTheme: withMuiTheme
      });
    });
  },

  render: function() {
    var styles = this.getStyles();

    var logoIcon = (
      <mui.IconButton onTouchTap={this.onLeftIconButtonTouchTap}>
        <SvgIcons.ActionHome />
      </mui.IconButton>
    );

    return (
      <div>
        <mui.AppBar
          title={'Material UI Dialogs'}
          iconElementLeft={logoIcon} />
        <mui.FloatingActionButton
          secondary={true}
          style={styles.floatingActionButton}
          onTouchTap={this.onFloatingActionButtonTouchTap} >
          <AddIcon />
        </mui.FloatingActionButton>
      </div>
    );
  }
}));
