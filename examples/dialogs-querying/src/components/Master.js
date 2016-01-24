var React = require('react');
var mui = require('material-ui');
var MuiThemeMixin = require('../mixins/MuiThemeMixin');
var Header = require('./Header');
require('../../assets/main.less');

module.exports = lore.connect({subscribe: true}, function(getState, props){
    return {};
  },
  React.createClass({
    displayName: 'Master',

    mixins: [MuiThemeMixin],

    getStyles: function() {
      return {
        content: {
          paddingTop: mui.Styles.Spacing.desktopKeylineIncrement,
          paddingBottom: mui.Styles.Spacing.desktopKeylineIncrement
        }
      };
    },

    render: function() {
      var styles = this.getStyles();

      return (
        <mui.AppCanvas>
          <Header params={this.props.params} />
          <div style={styles.content}>
            {this.props.children}
          </div>
        </mui.AppCanvas>
      );
    }
  })
);
