import React from 'react';
import { DynamicTextField } from 'lore-react-forms-material-ui';
import ConfigConnect from '../ConfigConnect';

let Connect = null;

export default function(name, attributes) {
  Connect = Connect || ConfigConnect();
  return (
    <Connect callback={attributes.connect}>
      <DynamicTextField
        label={attributes.label}
        name={name}
        getMessage={attributes.getMessage}
      />
    </Connect>
  );
}
