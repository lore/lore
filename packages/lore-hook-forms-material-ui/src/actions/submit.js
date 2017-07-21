import React from 'react';
import mui from 'material-ui';

export default function(name, attributes, onSubmit) {
  return (
    <mui.FlatButton
      key={name}
      label={attributes.label || 'Submit'}
      primary={true}
      onTouchTap={onSubmit}
    />
  );
}
