var React = require('react');
var mui = require('material-ui');
var CreateTodoDialog = require('../dialogs/todo/Create');

module.exports = React.createClass({
  displayName: 'EmptyListView',

  propTypes: {
    list: React.PropTypes.object.isRequired
  },

  getStyles: function(){
    return {
      content: {
        padding: '16px'
      },
      title: {
        paddingBottom: '16px'
      },
      button: {
        textAlign: 'center'
      }
    }
  },

  onFloatingActionButtonTouchTap: function(){
    var list = this.props.list;

    function createList(partialParams) {
      var params = _.assign({}, partialParams, {
        list: list.id,
        isCompleted: false
      });
      lore.actions.todo.create(params);
    }

    lore.dialog.show(function() {
      return (
        <CreateTodoDialog onSubmit={createList} />
      );
    });
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div style={styles.content}>
        <h2 style={styles.title}>
          You haven't created any todos for this list yet.
        </h2>
        <div style={styles.button}>
          <mui.RaisedButton
            label="Create Todo"
            primary={true}
            onTouchTap={this.onFloatingActionButtonTouchTap} />
        </div>
      </div>
    );
  }

});
