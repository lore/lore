var React = require('react');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var Header = require('./Header');
require('../../assets/main.less');

var muiTheme = getMuiTheme({
  // theme overrides
  zIndex: {
    appBar: 3
  }
});

module.exports = lore.connect({subscribe: true}, function(getState, props){
    return {};
  },
  React.createClass({
    displayName: 'Master',

    render: function() {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Header params={this.props.params} />
            <div>
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  })
);
