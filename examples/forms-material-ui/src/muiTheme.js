import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500, blue700, amber500} from 'material-ui/styles/colors';

module.exports = getMuiTheme({
  palette: {
    // primary1Color: deepOrange500,
    primary1Color: blue700,
    // primary1Color: '#6C5B7B',
    // accent1Color: '#355C7D',
    accent1Color: amber500,
  },
  zIndex: {
    appBar: 3
  }
});
