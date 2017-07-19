import React from 'react';

export default React.PropTypes.shape({
  subscribe: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  getState: React.PropTypes.func.isRequired
});
