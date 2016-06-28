"use strict";

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var _ = require('lodash');
var CreateTodoDialog = require('../../dialogs/todo/Create');
var UpdateListDialog = require('../../dialogs/list/Update');
var DeleteListDialog = require('../../dialogs/list/Delete');
var EmptyListView = require('../EmptyListView');
var PayloadStates = require('../../constants/PayloadStates');
var Spinner = require('../common/Spinner');
var TodoListItem = require('./TodoListItem');
var MoreVertIcon = require('material-ui/svg-icons/navigation/more-vert').default;

module.exports = lore.connect(function(getState, props) {
    return {
      list: getState('list.byId', {
        id: props.params.listId
      }),
      todos: getState('todo.find', {
        where: {
          list: props.params.listId
        }
      })
    };
  },
  Router.withRouter(React.createClass({
    displayName: 'Todos',

    propTypes: {
      list: React.PropTypes.object.isRequired,
      todos: React.PropTypes.object.isRequired
    },

    getStyles: function(){
      return {
        title: {
          textAlign: 'center'
        },
        buttonContainer: {
          paddingTop: '16px'
        },
        iconMenu: {
          position: 'absolute',
          top: '0px',
          right: '16px'
        }
      }
    },

    onFloatingActionButtonTouchTap: function(){
      var list = this.props.list;

      function createTodo(partialParams) {
        var params = _.assign({}, partialParams, {
          list: list.id
        });
        lore.actions.todo.create(params);
      }

      lore.dialog.show(function() {
        return (
          <CreateTodoDialog onSubmit={createTodo} />
        );
      });
    },

    onMenuItemSelection: function(e, value) {
      var list = this.props.list;
      var router = this.props.router;

      function updateList(params) {
        lore.actions.list.update(list, params);
      }

      function deleteList() {
        lore.actions.list.destroy(list);
        router.push('/lists');
      }

      lore.dialog.show(function(){
        if(value.ref === 'edit'){
          return (
            <UpdateListDialog
              list={list}
              onSubmit={updateList} />
          );
        }else if(value.ref === 'delete'){
          return (
            <DeleteListDialog
              onSubmit={deleteList} />
          );
        }
      });
    },

    render: function() {
      var styles = this.getStyles();
      var todos = this.props.todos;
      var list = this.props.list;
      var content = null;

      if (list.state === PayloadStates.FETCHING) {
        content = (
          <Spinner />
        );
      } else if (todos.state === PayloadStates.FETCHING) {
        content = (
          <Spinner />
        );
      } else if (todos.data.length === 0) {
        content = (
          <EmptyListView list={list} />
        );
      } else {
        var listItems = [
          <mui.Divider
            key={'divider-beginning'}
            inset={false} />
        ];

        todos.data.forEach(function(todo) {
          function onChecked() {
            lore.actions.todo.update(todo, {
              isCompleted: !todo.data.isCompleted
            });
          }

          var checkbox = (
            <mui.Checkbox
              checked={todo.data.isCompleted}
              onCheck={onChecked} />
          );

          listItems = listItems.concat([
            <TodoListItem
              key={todo.id || todo.cid}
              todo={todo} />,
            <mui.Divider
              key={'divider' + (todo.id || todo.cid)}
              inset={false} />
          ]);
        });

        content = (
          <div>
            <mui.List>
              {listItems}
            </mui.List>
            <div style={styles.buttonContainer}>
              <mui.RaisedButton
                label="Create Todo"
                primary={true}
                onTouchTap={this.onFloatingActionButtonTouchTap} />
            </div>
          </div>
        );
      }

      var iconButtonElement = (
        <mui.IconButton
          tooltip="Options"
          tooltipPosition="top-center">
          <MoreVertIcon />
        </mui.IconButton>
      );

      return (
        <mui.Card>
          <mui.CardTitle title={list.data.title} subtitle="Things to be done"/>
          <mui.CardText>
            {content}
          </mui.CardText>
          <div style={styles.iconMenu}>
            <mui.IconMenu
              iconButtonElement={iconButtonElement}
              desktop={true}
              onItemTouchTap={this.onMenuItemSelection} >
              <mui.MenuItem ref="edit" primaryText="Edit" />
              <mui.MenuItem ref="delete" primaryText="Delete" />
            </mui.IconMenu>
          </div>
        </mui.Card>
      );

      return (
        <div>
          <h2 style={styles.title}>
            {list.data.title}
          </h2>
          <mui.Paper>
            {content}
          </mui.Paper>
        </div>
      )
    }

  }))
);
