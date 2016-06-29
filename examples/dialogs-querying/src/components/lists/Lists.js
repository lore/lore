"use strict";

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Spinner = require('../common/Spinner');
var PayloadStates = require('../../constants/PayloadStates');
var CreateListDialog = require('../../dialogs/list/Create');

module.exports = lore.connect(function(getState, props){
    return {
      lists: getState('list.find', {
        where: { }
      })
    }
  },
  Router.withRouter(React.createClass({
    displayName: 'CollectionList',

    propTypes: {
      lists: React.PropTypes.object.isRequired
    },

    getStyles: function() {
      return {
        buttonWrapper: {
          padding: '16px'
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

    render: function () {
      var styles = this.getStyles();
      var lists = this.props.lists;

      if (lists.state === PayloadStates.FETCHING) {
        return <Spinner/>;
      }

      var listItems = lists.data.map(function(list) {
        function navigateToList() {
          this.props.router.push(`/lists/${list.id}`);
        }

        return (
          <mui.ListItem
            key={list.id}
            primaryText={list.data.title}
            onTouchTap={navigateToList.bind(this)} />
        );
      }.bind(this));

      return (
        <mui.Paper>
          <mui.List>
            <mui.Subheader>
              Todo Lists
            </mui.Subheader>
            {listItems}
          </mui.List>
          <div style={styles.buttonWrapper}>
            <mui.RaisedButton
              label="Create List"
              primary={true}
              onTouchTap={this.onFloatingActionButtonTouchTap} />
          </div>
        </mui.Paper>
      );
    }
  }))
);
