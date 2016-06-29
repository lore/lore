var React = require('react');
var mui = require('material-ui');
var AddIcon = require('material-ui/svg-icons/content/add').default;
var CreateListDialog = require('../dialogs/list/Create');

module.exports = React.createClass({
  displayName: 'EmptyAppView',

  getStyles: function(){
    return {
      content: {
        padding: '64px'
      },
      floatingActionButton: {
        top: '32px',
        right: '64px',
        position: 'fixed',
        zIndex: 5
      }
    }
  },

  onFloatingActionButtonTouchTap: function(){
    function createList(params) {
      lore.actions.list.create(params);
    }

    lore.dialog.show(function() {
      return (
        <CreateListDialog onSubmit={createList} />
      );
    });
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div>
        <div style={styles.content}>
          <h1>You don't have any lists yet!</h1>
          <h2>To create your first list click the big plus button in the top right.</h2>
        </div>
        <mui.FloatingActionButton
          secondary={true}
          style={styles.floatingActionButton}
          onTouchTap={this.onFloatingActionButtonTouchTap} >
          <AddIcon />
        </mui.FloatingActionButton>
      </div>
    );
  }

});
