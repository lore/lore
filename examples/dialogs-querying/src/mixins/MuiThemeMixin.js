var React = require('react');
var mui = require('material-ui');
const ThemeManager = mui.Styles.ThemeManager;
var DefaultRawTheme = mui.Styles.LightRawTheme;

module.exports =  {

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)
    }
  }

};
