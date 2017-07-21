import React from 'react';
import mui from 'material-ui';

export default function(name, attributes) {
  return (
    <mui.FlatButton
      key={name}
      label={attributes.label || 'Cancel'}
      onTouchTap={function() {}}
    />
  );
}
