var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');
var Router = require('react-router');
var mui = require('material-ui');
var PayloadStates = require('../constants/PayloadStates');
var Spinner = require('../components/common/Spinner');
var EmptyAppView = require('./EmptyAppView');
var Lists = require('./lists/Lists');

module.exports = lore.connect(function(getState, props){
    return {
      lists: getState('list.all', {
        where: { }
      })
    }
  },
  React.createClass({
    displayName: 'Home',

    getStyles: function(){
      return {
        content: {
          padding: 64
        }
      }
    },

    render: function() {
      var styles = this.getStyles();
      var lists = this.props.lists;
      var content = null;

      if (lists.state === PayloadStates.FETCHING) {
        content = <Spinner />;
      } else if(lists.data.length === 0) {
        content = <EmptyAppView />;
      } else {
        content = <Lists />;
      }

      return (
        <div style={styles.content}>
          <div className="row">
            <ReactTransitionGroup>
              {content}
            </ReactTransitionGroup>
          </div>
        </div>
      );
    }

  })
);
