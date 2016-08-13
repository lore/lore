var React = require('react');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
require('../../assets/main.less');

var muiTheme = getMuiTheme({
  // theme overrides
  zIndex: {
    appBar: 3
  }
});

module.exports = lore.connect(function(getState, props){
    return {};
  }, {subscribe: true})(
  React.createClass({
    displayName: 'Master',

    render: function() {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {React.cloneElement(this.props.children)}
          </div>
        </MuiThemeProvider>
      );
    }
  })
);
