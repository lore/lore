import React from 'react';
import { FlatButton } from 'material-ui';

export default function(name, attributes) {
  return (
    <FlatButton
      key={name}
      label={attributes.label || 'Cancel'}
      onTouchTap={function() {}}
    />
  );
}
