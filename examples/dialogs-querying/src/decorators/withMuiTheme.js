import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var muiTheme = getMuiTheme({
  // theme overrides
  zIndex: {
    appBar: 3
  }
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withMuiTheme(WrappedComponent) {
  const WithMuiTheme = React.createClass({
    render() {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <WrappedComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  });

  WithMuiTheme.displayName = `withMuiTheme(${getDisplayName(WrappedComponent)})`;
  WithMuiTheme.WrappedComponent = WrappedComponent;

  return hoistStatics(WithMuiTheme, WrappedComponent)
}
