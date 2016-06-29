"use strict";

var React = require('react');
var Router = require('react-router');
var Spinner = require('./common/Spinner');
var EmptyAppView = require('./EmptyAppView');
var PayloadStates = require('../constants/PayloadStates');
var cx = require('classnames');

module.exports = lore.connect(function(getState, props) {
    return {
      lists: getState('list.find', {
        where: { }
      })
    }
  },
  Router.withRouter(React.createClass({
    displayName: 'Layout',

    propTypes: {
      lists: React.PropTypes.object.isRequired
    },

    getStyles: function(){
      return {
        row: {
          maxWidth: '900px',
          margin: 'auto',
          marginTop: '32px'
        }
      }
    },

    renderListItem: function(list){
      return (
        <ListItem
          key={list.cid}
          list={list} />
      );
    },

    renderLeftPanel: function() {
      var classes = cx({
        "col-lg-3": true,
        "col-md-4": true,
        "col-sm-4": true,
        "col-xs-4": true,
        "col-md-offset-1": true
      });

      return (
        <div className={classes}>
          {this.props.leftPanel}
        </div>
      );
    },

    renderRightPanel: function() {
      var classes = cx({
        "col-lg-6": true,
        "col-md-5": true,
        "col-sm-5": true,
        "col-xs-5": true
      });

      return (
        <div className={classes}>
          {this.props.rightPanel}
        </div>
      );
    },

    render: function () {
      var styles = this.getStyles();
      var lists = this.props.lists;
      var content = null;

      if (lists.state === PayloadStates.FETCHING) {
        content = (
          <Spinner/>
        );
      } else if (lists.data.length === 0) {
        content = (
          <EmptyAppView />
        );
      } else {
        content = (
          <div>
            {this.renderLeftPanel()}
            {this.renderRightPanel()}
          </div>
        );
      }

      return (
        <div className="row" style={styles.row}>
          {content}
        </div>
      );
    }
  }))
);
