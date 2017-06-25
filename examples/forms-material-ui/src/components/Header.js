var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var SvgIcons = require('material-ui/svg-icons');
var AddIcon = require('material-ui/svg-icons/content/add').default;
var withMuiTheme = require('../decorators/withMuiTheme').default;

var Routes = {
  TWEETS: '/tweets',
  USERS: '/users'
};

module.exports = Router.withRouter(React.createClass({
  displayName: 'Header',

  getStyles: function(){
    return {
      floatingActionButton: {
        top: '32px',
        right: '64px',
        position: 'fixed',
        zIndex: 5
      },
      tabs: {
        marginTop: '8px'
      },
      tab: {
        marginBottom: '8px',
        width: '150px'
      }
    }
  },

  onLeftIconButtonTouchTap: function() {
    this.props.router.push('/');
  },

  getTabValue: function() {
    var router = this.props.router;

    if (router.isActive(Routes.TWEETS)) {
      return Routes.TWEETS;
    }

    if (router.isActive(Routes.USERS)) {
      return Routes.USERS;
    }
  },

  onTabChange: function(route) {
    this.props.router.push(route);
  },

  render: function() {
    var styles = this.getStyles();
    var tabValue = this.getTabValue();

    var logoIcon = (
      <mui.IconButton onTouchTap={this.onLeftIconButtonTouchTap}>
        <SvgIcons.ActionHome />
      </mui.IconButton>
    );

    return (
      <mui.AppBar
        title="Material UI Forms"
        iconElementLeft={logoIcon}
        titleStyle={{flex: 'inherit', paddingRight: '48px'}}>
        <mui.Tabs
          style={styles.tabs}
          value={tabValue}
          onChange={this.onTabChange}>
          <mui.Tab
            value={Routes.TWEETS}
            label="Tweets"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.TWEETS);
            }}/>
          <mui.Tab
            value={Routes.USERS}
            label="Users"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.USERS);
            }}/>
        </mui.Tabs>
      </mui.AppBar>
    );
  }
}));
